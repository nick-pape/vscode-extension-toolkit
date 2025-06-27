# Contributing to VSCode Extension Toolkit

Thank you for your interest in contributing to the VSCode Extension Toolkit! This guide will help you get started with development and contribution workflows.

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **Git**
- **Visual Studio Code** (for development and testing)

### Setting Up Your Development Environment

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/your-username/vscode-extension-toolkit.git
   cd vscode-extension-toolkit
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```
   
   Or with npm:
   ```bash
   npm install
   ```

3. **Build the Project**
   ```bash
   pnpm build
   ```
   
   Or with npm:
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
vscode-extension-toolkit/
├── src/                    # Source TypeScript files
│   ├── BaseContainer.ts    # Core container class
│   ├── BaseFeature.ts      # Base feature class
│   ├── BaseTreeProvider.ts # Tree provider base class
│   ├── BaseTreeViewFeature.ts # Tree view feature
│   ├── CommandDefinition.ts # Command management
│   ├── index.ts           # Main exports
│   └── scripts/           # Build and utility scripts
├── lib/                   # Compiled JavaScript output
├── dist/                  # Distribution files
├── docs/                  # Auto-generated API documentation
│   ├── input/            # API Extractor input
│   └── markdown/         # Generated markdown docs
├── config/               # Build configuration
│   ├── heft.json         # Heft build configuration
│   └── api-extractor.json # API documentation config
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
└── pnpm-lock.yaml        # Dependency lock file
```

## 🔧 Development Workflow

### Building the Project

The project uses [Heft](https://heft.rushstack.io/) as the build system, which provides:
- TypeScript compilation
- API documentation extraction
- Linting
- Type checking

```bash
# Full clean build
pnpm build

# Watch mode (rebuilds on file changes)
pnpm build --watch
```

### Running Scripts

| Command | Description |
|---------|-------------|
| `pnpm build` | Clean build with TypeScript compilation, linting, and API extraction |
| `pnpm generate-docs` | Generate API documentation in markdown format |

### Code Style and Linting

This project uses ESLint with Rushstack's configuration for consistent code style:

```bash
# Lint code (automatically run during build)
npx eslint src/

# Auto-fix linting issues where possible
npx eslint src/ --fix
```

### API Documentation

API documentation is automatically generated using [API Extractor](https://api-extractor.com/) and [API Documenter](https://api-extractor.com/pages/setup/generating_docs/):

1. **Build the project** to generate API metadata
2. **Generate docs** to create markdown documentation

```bash
pnpm build
pnpm generate-docs
```

The generated documentation will be available in `docs/markdown/`.

## 🧪 Testing Your Changes

### Testing with a Sample Extension

1. Create a test VS Code extension project
2. Install your local version of the toolkit:
   ```bash
   cd your-test-extension
   npm install /path/to/vscode-extension-toolkit
   ```
3. Use the toolkit in your test extension and verify functionality

### Manual Testing Checklist

When making changes, ensure:

- [ ] All base classes instantiate correctly
- [ ] Features can be activated and disposed
- [ ] Tree views render and update properly
- [ ] Commands register and execute correctly
- [ ] No memory leaks (disposables are properly cleaned up)
- [ ] TypeScript types are exported correctly

## 📝 Making Changes

### Coding Guidelines

1. **Follow TypeScript best practices**
   - Use strict type checking
   - Prefer interfaces over types for extensibility
   - Document public APIs with JSDoc comments

2. **Use the @alpha tag** for all public APIs
   ```typescript
   /**
    * @alpha
    */
   export class MyClass { }
   ```

3. **Implement proper disposal**
   - All classes that hold resources should implement `vscode.Disposable`
   - Always clean up event listeners, commands, and other VS Code registrations

4. **Maintain backwards compatibility**
   - This is an alpha API, but avoid breaking changes when possible
   - If breaking changes are necessary, document them clearly

### Commit Guidelines

We follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(commands): add CommandDefinition.asUri() method
fix(features): resolve disposal race condition
docs(readme): update installation instructions
```

## 🔄 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following the guidelines above
   - Update documentation if needed
   - Test your changes thoroughly

3. **Build and verify**
   ```bash
   pnpm build
   pnpm generate-docs
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(scope): your change description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub.

### PR Requirements

Your pull request should:

- [ ] Include a clear description of the changes
- [ ] Reference any related issues
- [ ] Pass all builds (TypeScript compilation, linting)
- [ ] Include updated documentation if needed
- [ ] Have meaningful commit messages
- [ ] Not introduce breaking changes (unless discussed)

## 🐛 Reporting Issues

When reporting issues:

1. **Search existing issues** to avoid duplicates
2. **Use issue templates** if available
3. **Provide clear reproduction steps**
4. **Include relevant code samples**
5. **Specify VS Code and toolkit versions**

## 📚 Development Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Rushstack Developer Tools](https://rushstack.io/)
- [API Extractor Documentation](https://api-extractor.com/)

## 🤝 Community

- Be respectful and constructive
- Help others learn and grow
- Share knowledge and best practices
- Follow the code of conduct

## 📞 Getting Help

- 💬 Start a [GitHub Discussion](https://github.com/your-repo/vscode-extension-toolkit/discussions)
- 🐛 Open an [Issue](https://github.com/your-repo/vscode-extension-toolkit/issues)
- 📖 Check the [Documentation](./docs/markdown/index.md)

---

Thank you for contributing to VSCode Extension Toolkit! 🙏
