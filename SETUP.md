# Development Setup

This project uses [Rush](https://rushjs.io/) for monorepo management. Follow these steps to get started:

## Prerequisites

- Node.js 22.x or higher
- npm (comes with Node.js)

## Getting Started

1. **Install Rush globally**
   ```bash
   npm install -g @microsoft/rush
   ```

2. **Install dependencies**
   ```bash
   rush install
   ```

3. **Build the project**
   ```bash
   rush build
   ```

4. **Generate documentation**
   ```bash
   rush generate-docs
   ```

## Available Commands

- `rush install` - Install all dependencies
- `rush build` - Build all projects
- `rush rebuild` - Clean and build all projects
- `rush generate-docs` - Generate API documentation
- `rush update` - Update dependencies and shrinkwrap files

## Project Structure

This is a Rush monorepo with the following structure:

- `common/` - Rush configuration and shared tooling
- `vscode-extension-toolkit/` - The main VSCode Extension Toolkit package

## Development Workflow

1. Make your changes in the appropriate project folder
2. Run `rush build` to build your changes
3. Run `rush generate-docs` to update documentation
4. Create a pull request

The CI pipeline will automatically:
- Install dependencies using Rush
- Build all projects
- Generate documentation
- Run tests (when available)
- Publish to NPM on release

## Troubleshooting

- If you encounter build issues, try `rush rebuild` to do a clean build
- If dependency issues occur, try `rush update` followed by `rush install`
- For more Rush commands, run `rush --help`
