/**
 * @file MMM-Life360.js
 * @description MagicMirror² module for displaying Life360 location tracking data
 * @author ap0ught
 * @license MIT
 */

Module.register("MMM-Life360", {

  defaults: {
    username: "",
    password: "",
    circles: [], // Array of circle IDs to display. Empty array means all circles.
    members: [], // Array of member IDs to display. Empty array means all members.
    updateInterval: 60000, // 1 minute (in milliseconds)
    showAddress: true,
    showLastUpdated: true,
    showBattery: true,
    maxWidth: "400px",
    animationSpeed: 1000
  },

  /**
   * Load CSS file for styling
   */
  getStyles() {
    return ["MMM-Life360.css"];
  },

  /**
   * Initialize the module
   */
  start() {
    Log.info("Starting module: " + this.name);
    this.locations = [];
    this.loaded = false;
    this.error = null;

    // Validate configuration
    if (!this.config.username || !this.config.password) {
      this.error = "Please configure your Life360 username and password";
      Log.error(this.name + ": " + this.error);
      return;
    }

    // Send config to node helper
    this.sendSocketNotification("CONFIG", this.config);
  },

  /**
   * Handle socket notifications from node helper
   */
  socketNotificationReceived(notification, payload) {
    if (notification === "LOCATION_DATA") {
      this.loaded = true;
      this.locations = payload;
      this.error = null;
      this.updateDom(this.config.animationSpeed);
    } else if (notification === "ERROR") {
      this.loaded = true;
      this.error = payload;
      this.updateDom(this.config.animationSpeed);
    }
  },

  /**
   * Generate DOM content for the module
   */
  getDom() {
    const wrapper = document.createElement("div");
    wrapper.className = "life360-wrapper";
    wrapper.style.maxWidth = this.config.maxWidth;

    // Show loading state
    if (!this.loaded) {
      wrapper.innerHTML = "Loading Life360 data...";
      wrapper.className += " dimmed light small";
      return wrapper;
    }

    // Show error message
    if (this.error) {
      wrapper.innerHTML = "Error: " + this.error;
      wrapper.className += " dimmed light small";
      return wrapper;
    }

    // Show location data
    if (this.locations.length === 0) {
      wrapper.innerHTML = "No location data available";
      wrapper.className += " dimmed light small";
      return wrapper;
    }

    // Create table for location data
    const table = document.createElement("table");
    table.className = "small";

    this.locations.forEach((location) => {
      const row = document.createElement("tr");
      row.className = "life360-member";

      // Member name
      const nameCell = document.createElement("td");
      nameCell.className = "life360-name";
      nameCell.textContent = location.name;
      row.appendChild(nameCell);

      // Location details
      const detailsCell = document.createElement("td");
      detailsCell.className = "life360-details";

      let details = "";

      // Address
      if (this.config.showAddress && location.address) {
        const addressDiv = document.createElement("div");
        addressDiv.className = "life360-address";
        addressDiv.textContent = location.address;
        detailsCell.appendChild(addressDiv);
      }

      // Battery
      if (this.config.showBattery && location.battery !== undefined && location.battery !== null) {
        const batteryDiv = document.createElement("div");
        batteryDiv.className = "life360-battery";
        if (location.battery < 20) {
          batteryDiv.className += " battery-low";
        }
        batteryDiv.textContent = "🔋 " + location.battery + "%";
        detailsCell.appendChild(batteryDiv);
      }

      // Last updated
      if (this.config.showLastUpdated && location.timestamp) {
        const lastUpdate = this.getTimeSince(location.timestamp);
        const updatedDiv = document.createElement("div");
        updatedDiv.className = "life360-updated dimmed xsmall";
        updatedDiv.textContent = "Updated " + lastUpdate;
        detailsCell.appendChild(updatedDiv);
      }

      row.appendChild(detailsCell);

      table.appendChild(row);
    });

    wrapper.appendChild(table);
    return wrapper;
  },

  /**
   * Calculate time since a given timestamp
   */
  getTimeSince(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) {
      return "just now";
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return minutes + " min" + (minutes > 1 ? "s" : "") + " ago";
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return hours + " hour" + (hours > 1 ? "s" : "") + " ago";
    } else {
      const days = Math.floor(seconds / 86400);
      return days + " day" + (days > 1 ? "s" : "") + " ago";
    }
  }
});
