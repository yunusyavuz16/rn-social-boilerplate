# Contributing to React Native Social Media Boilerplate

First off, thank you for considering contributing to this project! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details**:
  - OS (iOS/Android version)
  - React Native version
  - Device (simulator/real device)

### 💡 Suggesting Features

Feature requests are welcome! Please provide:

- **Clear description** of the feature
- **Use case** - why is this feature needed?
- **Possible implementation** approach (optional)

### 🔧 Pull Requests

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create a branch** for your feature/fix:
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-description
   ```
4. **Make your changes** following our coding standards
5. **Test your changes**:
   ```bash
   npm test
   npm run lint
   npx tsc --noEmit
   ```
6. **Commit** with a clear message:
   ```bash
   git commit -m "feat: add amazing feature"
   # or
   git commit -m "fix: resolve bug description"
   ```
7. **Push** to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yunusyavuz016/rn-social-boilerplate.git
cd rn-social-boilerplate

# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Run the app
npm run ios
# or
npm run android
```

## Coding Standards

### TypeScript

- Use **strict mode** - no `any` types
- Define proper interfaces/types
- Use meaningful variable names

### Components

- Follow **Atomic Design** pattern
- Each component in its own folder with:
  - `index.tsx` - Component
  - `*.styles.ts` - Styles
  - `*.types.ts` - Types (if needed)
  - `*.test.tsx` - Tests

### Testing

- Maintain **80%+ coverage**
- Write tests for new features
- Test edge cases

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding/updating tests
- `chore:` - Maintenance tasks

## Project Structure

```
src/
├── components/
│   ├── Atoms/       # Basic components
│   ├── Molecules/   # Composite components
│   └── Organisms/   # Complex components
├── screens/         # Screen components
├── hooks/           # Custom hooks
├── services/        # Business logic
├── store/           # Redux store
└── ...
```

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

Thank you for contributing! 🚀
