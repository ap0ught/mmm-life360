# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-09

### Added
- Initial release of MMM-Life360 module
- Life360 API integration for real-time location tracking
- Display family member locations with addresses
- Battery level indicator with low battery warning
- Last updated timestamp for each member
- Configurable update intervals
- Filter support for specific circles and members
- Comprehensive documentation and configuration examples
- Security features:
  - XSS prevention using textContent instead of innerHTML
  - HTTPS for all API communications
  - Proper null/undefined checks
- Example configuration file
- MIT License

### Security
- All API data is sanitized before display to prevent XSS attacks
- Credentials transmitted over HTTPS only
- Requires Node.js 18+ for better security and performance
