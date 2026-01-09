# Contributing to MMM-Life360

Thank you for your interest in contributing to MMM-Life360! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Your MagicMirror version
- Your Node.js version
- Relevant log output (with sensitive information removed)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please open an issue with:
- A clear, descriptive title
- Detailed description of the proposed feature
- Any relevant examples or mockups
- Explanation of why this enhancement would be useful

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature: `git checkout -b feature/my-new-feature`
3. Make your changes
4. Test your changes thoroughly
5. Ensure your code follows the existing style
6. Update documentation as needed
7. Commit your changes: `git commit -am 'Add some feature'`
8. Push to the branch: `git push origin feature/my-new-feature`
9. Submit a pull request

### Code Style Guidelines

- Use 2 spaces for indentation
- Use semicolons
- Use double quotes for strings
- Add comments for complex logic
- Keep functions focused and single-purpose
- Follow existing naming conventions

### Security Guidelines

- Never commit credentials or API keys
- Sanitize all external data before display (use textContent, not innerHTML)
- Validate all user inputs
- Use HTTPS for all external communications
- Follow secure coding practices

### Testing

Before submitting a pull request:
- Test your changes with a real MagicMirror installation if possible
- Verify JavaScript syntax: `node -c MMM-Life360.js`
- Test with different configuration options
- Check for console errors
- Verify the module works with the latest MagicMirror version

### Documentation

- Update README.md if adding new features or configuration options
- Update CHANGELOG.md following the Keep a Changelog format
- Add comments to complex code sections
- Update config-example.js if adding new configuration options

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Public or private harassment
- Publishing others' private information without permission

## Questions?

Feel free to open an issue with the label "question" if you need help or clarification.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
