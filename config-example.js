/**
 * Example configuration for MMM-Life360
 * 
 * Copy this configuration to your MagicMirror's config/config.js file
 * and update the username and password with your Life360 credentials.
 */

// Basic configuration - minimal setup
{
  module: "MMM-Life360",
  position: "top_right",
  config: {
    username: "your_life360_email@example.com",
    password: "your_life360_password"
  }
}

// Advanced configuration - all options shown
{
  module: "MMM-Life360",
  position: "top_right",
  header: "Family Locations",
  config: {
    // Required: Your Life360 credentials
    username: "your_life360_email@example.com",
    password: "your_life360_password",
    
    // Optional: Filter specific circles (empty array = all circles)
    // To find circle IDs, check the logs when the module first runs
    circles: [],
    
    // Optional: Filter specific members (empty array = all members)
    // To find member IDs, check the logs when the module first runs
    members: [],
    
    // Optional: Update interval in milliseconds (default: 60000 = 1 minute)
    // Minimum recommended: 30000 (30 seconds) to avoid rate limiting
    updateInterval: 60000,
    
    // Optional: Display settings
    showAddress: true,      // Show location address/place name
    showLastUpdated: true,  // Show time since last update
    showBattery: true,      // Show battery percentage
    
    // Optional: Styling
    maxWidth: "400px",      // Maximum width of module
    animationSpeed: 1000    // Animation speed for updates (milliseconds)
  }
}

// Multiple instances - you can run multiple instances to show different circles
{
  module: "MMM-Life360",
  position: "top_left",
  header: "Kids",
  config: {
    username: "your_life360_email@example.com",
    password: "your_life360_password",
    members: ["member_id_1", "member_id_2"],  // Filter to show only specific kids
    updateInterval: 120000  // Update every 2 minutes
  }
},
{
  module: "MMM-Life360",
  position: "top_right",
  header: "Adults",
  config: {
    username: "your_life360_email@example.com",
    password: "your_life360_password",
    members: ["member_id_3", "member_id_4"],  // Filter to show only adults
    updateInterval: 120000
  }
}
