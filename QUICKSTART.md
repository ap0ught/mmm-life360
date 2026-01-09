# Quick Start Guide

Get MMM-Life360 up and running in 5 minutes!

## Prerequisites

- MagicMirror² installed and working
- Life360 account with active circles
- Node.js 18 or higher

## Installation Steps

### 1. Install the Module

```bash
cd ~/MagicMirror/modules
git clone https://github.com/ap0ught/mmm-life360.git MMM-Life360
```

### 2. Configure the Module

Open your MagicMirror config file:

```bash
nano ~/MagicMirror/config/config.js
```

Add this to your `modules` array:

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

**Important:** Replace `your_life360_email@example.com` and `your_life360_password` with your actual Life360 credentials.

### 3. Restart MagicMirror

```bash
pm2 restart MagicMirror
```

Or if you're running it manually:

```bash
cd ~/MagicMirror
npm start
```

### 4. Verify It's Working

- You should see "Loading Life360 data..." initially
- Within a few seconds, your family members' locations should appear
- If you see an error, check the logs: `pm2 logs MagicMirror`

## Troubleshooting

### Error: "Please configure your Life360 username and password"
- Make sure you've added `username` and `password` to your config
- Check for typos in your config file

### Error: "Authentication failed"
- Verify your Life360 credentials are correct
- Try logging into life360.com with the same credentials
- Make sure you're using your Life360 account credentials (not Facebook/Google login)

### Module shows but no data appears
- Check if you have active circles in your Life360 account
- Verify family members have location sharing enabled
- Look at logs for errors: `pm2 logs MagicMirror`

## Next Steps

### Customize Your Display

See the full README.md for more configuration options:
- Change update interval
- Filter specific family members
- Show/hide battery, address, or last updated time
- Customize styling

### Example Configurations

Check `config-example.js` for more advanced setups including:
- Multiple module instances
- Filtering specific circles or members
- Custom styling options

## Support

- 📖 Read the full [README.md](README.md)
- 🐛 Report issues on [GitHub](https://github.com/ap0ught/mmm-life360/issues)
- 💡 See [CONTRIBUTING.md](CONTRIBUTING.md) to help improve the module

## Security Reminder

⚠️ Your Life360 credentials are stored in plain text in your config file. Make sure:
- Your MagicMirror is on a secure network
- Config file has proper permissions: `chmod 600 ~/MagicMirror/config/config.js`
- You trust everyone who has access to your MagicMirror device
