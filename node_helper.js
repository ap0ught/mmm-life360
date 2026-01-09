/**
 * @file node_helper.js
 * @description Node helper for MMM-Life360 module - handles Life360 API communication
 * @author ap0ught
 * @license MIT
 */

const NodeHelper = require("node_helper");
const https = require("https");

module.exports = NodeHelper.create({

  start() {
    console.log("Starting node helper for: " + this.name);
    this.config = null;
    this.authToken = null;
    this.updateTimer = null;
  },

  /**
   * Handle socket notifications from module
   */
  socketNotificationReceived(notification, payload) {
    if (notification === "CONFIG") {
      this.config = payload;
      this.authenticate();
    }
  },

  /**
   * Authenticate with Life360 API
   */
  authenticate() {
    console.log(this.name + ": Authenticating with Life360...");

    const postData = JSON.stringify({
      username: this.config.username,
      password: this.config.password
    });

    const options = {
      hostname: "api-cloudfront.life360.com",
      port: 443,
      path: "/v3/oauth2/token",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
        "Authorization": "Basic U3dlcUFOQWdFVkVoVWt1cGVjcmVrYXN0ZXFhVGVXckFTV2E1dXN3MzpXMnZBV3JlY2hhUHJlZGFoVVJhZ1VYYWZyQW5hbWVqdQ==",
        "User-Agent": "Life360/22.49.0 (iPhone; iOS 16.0; Scale/3.00)"
      }
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          if (res.statusCode === 200) {
            const response = JSON.parse(data);
            this.authToken = response.access_token;
            console.log(this.name + ": Authentication successful");
            this.fetchLocationData();
            this.scheduleUpdate();
          } else {
            const errorMsg = "Authentication failed with status " + res.statusCode;
            console.error(this.name + ": " + errorMsg);
            this.sendSocketNotification("ERROR", errorMsg);
          }
        } catch (error) {
          console.error(this.name + ": Authentication error: " + error.message);
          this.sendSocketNotification("ERROR", "Authentication failed: " + error.message);
        }
      });
    });

    req.on("error", (error) => {
      console.error(this.name + ": Authentication request error: " + error.message);
      this.sendSocketNotification("ERROR", "Authentication failed: " + error.message);
    });

    req.write(postData);
    req.end();
  },

  /**
   * Fetch location data from Life360 API
   */
  fetchLocationData() {
    if (!this.authToken) {
      console.error(this.name + ": No auth token available");
      return;
    }

    console.log(this.name + ": Fetching location data...");

    const options = {
      hostname: "api-cloudfront.life360.com",
      port: 443,
      path: "/v3/circles",
      method: "GET",
      headers: {
        "Authorization": "Bearer " + this.authToken,
        "User-Agent": "Life360/22.49.0 (iPhone; iOS 16.0; Scale/3.00)"
      }
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          if (res.statusCode === 200) {
            const response = JSON.parse(data);
            this.processCirclesData(response.circles);
          } else if (res.statusCode === 401) {
            console.log(this.name + ": Token expired, re-authenticating...");
            this.authToken = null;
            this.authenticate();
          } else {
            const errorMsg = "Failed to fetch location data: status " + res.statusCode;
            console.error(this.name + ": " + errorMsg);
            this.sendSocketNotification("ERROR", errorMsg);
          }
        } catch (error) {
          console.error(this.name + ": Error processing location data: " + error.message);
          this.sendSocketNotification("ERROR", "Failed to process data: " + error.message);
        }
      });
    });

    req.on("error", (error) => {
      console.error(this.name + ": Location data request error: " + error.message);
      this.sendSocketNotification("ERROR", "Failed to fetch data: " + error.message);
    });

    req.end();
  },

  /**
   * Process circles data and extract location information
   */
  processCirclesData(circles) {
    if (!circles || circles.length === 0) {
      this.sendSocketNotification("LOCATION_DATA", []);
      return;
    }

    const locations = [];

    circles.forEach((circle) => {
      // Filter by configured circles if specified
      if (this.config.circles.length > 0 && !this.config.circles.includes(circle.id)) {
        return;
      }

      if (circle.members && circle.members.length > 0) {
        circle.members.forEach((member) => {
          // Filter by configured members if specified
          if (this.config.members.length > 0 && !this.config.members.includes(member.id)) {
            return;
          }

          const location = member.location;
          if (location) {
            const memberData = {
              name: member.firstName + " " + member.lastName,
              address: location.name || location.address1 || "Unknown location",
              latitude: location.latitude,
              longitude: location.longitude,
              battery: location.battery ? Math.round(parseFloat(location.battery)) : null,
              timestamp: location.timestamp ? parseInt(location.timestamp) * 1000 : Date.now(),
              isDriving: location.isDriving === "1",
              speed: location.speed ? parseFloat(location.speed) : 0
            };

            locations.push(memberData);
          }
        });
      }
    });

    console.log(this.name + ": Found " + locations.length + " member location(s)");
    this.sendSocketNotification("LOCATION_DATA", locations);
  },

  /**
   * Schedule periodic updates
   */
  scheduleUpdate() {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }

    this.updateTimer = setInterval(() => {
      this.fetchLocationData();
    }, this.config.updateInterval);
  },

  /**
   * Cleanup when module is stopped
   */
  stop() {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }
  }
});
