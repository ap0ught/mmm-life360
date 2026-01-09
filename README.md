# MMM-Life360

A MagicMirror² module for displaying Life360 location tracking data. This module integrates with the Life360 API to show real-time location information for family members in your Life360 circles.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- 🌍 **Real-time Location Tracking**: Display current locations of Life360 circle members
- 🔋 **Battery Status**: Show battery levels with visual indicators
- ⏰ **Last Updated Time**: See when location was last updated
- 📍 **Address Display**: Show human-readable addresses or location names
- ⚙️ **Flexible Filtering**: Filter by specific circles or members
- 🔄 **Auto-refresh**: Configurable update intervals

## Screenshots

The module displays member names with their current location, battery status, and last update time in a clean, easy-to-read format.

## Installation

1. Navigate to your MagicMirror's `modules` folder:
```bash
cd ~/MagicMirror/modules
```

2. Clone this repository:
```bash
git clone https://github.com/ap0ught/mmm-life360.git
```

3. Navigate to the module folder:
```bash
cd mmm-life360
```

## Configuration

Add the module to your MagicMirror's `config/config.js` file:

### Minimal Configuration

```javascript
{
  module: "MMM-Life360",
  position: "top_right",
  config: {
    username: "your_life360_email@example.com",
    password: "your_life360_password"
  }
}
```

### Full Configuration with All Options

```javascript
{
  module: "MMM-Life360",
  position: "top_right",
  header: "Family Locations",
  config: {
    username: "your_life360_email@example.com",
    password: "your_life360_password",
    circles: [],  // Array of circle IDs to display (empty = all circles)
    members: [],  // Array of member IDs to display (empty = all members)
    updateInterval: 60000,  // Update every 60 seconds (in milliseconds)
    showAddress: true,      // Show location address
    showLastUpdated: true,  // Show last update time
    showBattery: true,      // Show battery percentage
    maxWidth: "400px",      // Maximum width of the module
    animationSpeed: 1000    // DOM update animation speed
  }
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `username` | String | **Required** | Your Life360 account email address |
| `password` | String | **Required** | Your Life360 account password |
| `circles` | Array | `[]` | Array of circle IDs to display. Empty array shows all circles |
| `members` | Array | `[]` | Array of member IDs to display. Empty array shows all members |
| `updateInterval` | Number | `60000` | Time between location updates in milliseconds (minimum: 30000) |
| `showAddress` | Boolean | `true` | Display location address or place name |
| `showLastUpdated` | Boolean | `true` | Show time since last location update |
| `showBattery` | Boolean | `true` | Display battery percentage |
| `maxWidth` | String | `"400px"` | Maximum width of the module display |
| `animationSpeed` | Number | `1000` | Speed of DOM update animations in milliseconds |

## Finding Circle and Member IDs

If you want to filter specific circles or members, you'll need their IDs:

1. Open your browser's developer console (F12)
2. Run the module with empty `circles` and `members` arrays
3. Check the MagicMirror logs or node helper console output
4. The module will log available circles and members with their IDs
5. Copy the IDs you want to filter and add them to your config

Alternatively, you can use the Life360 API directly or check the network requests when using the Life360 web interface.

## Position Options

The module can be placed in any MagicMirror position region:
- `top_bar`
- `top_left`
- `top_center`
- `top_right`
- `upper_third`
- `middle_center`
- `lower_third`
- `bottom_left`
- `bottom_center`
- `bottom_right`
- `bottom_bar`

## Security Notes

⚠️ **Important Security Information:**

- **Your Life360 credentials are stored in plain text** in the MagicMirror config file
- Ensure your MagicMirror config file has proper file permissions (readable only by the user running MagicMirror)
- Consider setting file permissions: `chmod 600 ~/MagicMirror/config/config.js`
- Use a strong password and enable two-factor authentication on your Life360 account
- Ensure your MagicMirror is on a secure, trusted network
- Do not expose your MagicMirror to the public internet without proper authentication
- Consider creating a dedicated Life360 account with limited access if sharing your mirror
- This module uses the unofficial Life360 API which may change without notice
- Life360 may block or limit API access - use responsibly
- All API communication is done over HTTPS for transport security

## Troubleshooting

### Module shows "Loading Life360 data..." indefinitely
- Check your username and password are correct
- Verify your network connection
- Check MagicMirror logs for error messages: `pm2 logs MagicMirror`

### Authentication fails
- Ensure you're using your Life360 email and password (not third-party login)
- Check if Life360 has changed their API endpoints
- Try logging into Life360's website to verify credentials work

### No location data displayed
- Verify you have active circles with members in your Life360 account
- Check that location sharing is enabled for the members
- Ensure members have the Life360 app installed and location services enabled

### Battery percentage not showing
- Some devices may not report battery level
- Check if battery level is visible in the official Life360 app

## API Rate Limiting

Life360 may implement rate limiting on their API. The default update interval is 60 seconds, which should be safe for most use cases. If you experience issues:
- Increase the `updateInterval` value
- Reduce the number of circles or members being tracked
- Monitor logs for rate limiting errors

## Unofficial API Notice

This module uses the **unofficial** Life360 API based on reverse-engineering their mobile app. This means:
- The API may change without notice
- Life360 could block third-party access at any time
- Features may break if Life360 updates their systems
- No official support from Life360

## Privacy Considerations

This module displays real-time location data. Please consider:
- Who has physical access to your MagicMirror
- Whether displayed information should be visible to guests
- Using the filtering options to limit displayed members
- Your family members' consent to display their location

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## Credits

- Inspired by various Life360 integrations in the home automation community
- Built for MagicMirror² by [Michael Teeuw](https://github.com/MichMich/MagicMirror)
- Life360 API research from the open-source community

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This module is not affiliated with, officially maintained by, or endorsed by Life360. Use at your own risk. The author is not responsible for any issues arising from the use of this module, including but not limited to API changes, account restrictions, or privacy concerns.

## Support

If you find this module useful, please star the repository! If you encounter any issues, please open an issue on GitHub with:
- Your MagicMirror version
- Node.js version
- Error messages from logs
- Relevant configuration (without credentials)