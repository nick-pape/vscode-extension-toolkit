# VSCode Extension Toolkit 🚀

A powerful, structured framework for building Visual Studio Code extensions with confidence and maintainability.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## ✨ Features

- **🏗️ Structured Architecture**: Built around a clean container/feature pattern that scales
- **🌳 Tree View Support**: Simplified tree view creation with `BaseTreeProvider` and `BaseTreeViewFeature`
- **⚡ Command Management**: Type-safe command definitions with `CommandDefinition`
- **🧹 Automatic Cleanup**: Built-in disposal management for all resources
- **📁 Modular Features**: Compose complex extensions from simple, reusable features
- **🔧 TypeScript First**: Full TypeScript support with comprehensive type definitions

## 📦 Installation

```bash
npm install vscode-extension-toolkit
```

## 🚀 Quick Start

### Basic Extension Setup

```typescript
import * as vscode from 'vscode';
import { BaseContainer, BaseFeature } from 'vscode-extension-toolkit';

// 1. Create your container (entry point)
export function activate(context: vscode.ExtensionContext) {
    const container = BaseContainer.initialize(context);
    
    // 2. Create and activate your main feature
    const mainFeature = new MyMainFeature(container);
    mainFeature.activate();
}

// 3. Define your main feature
class MyMainFeature extends BaseFeature {
    protected registerCommands(): vscode.Disposable[] {
        return [
            vscode.commands.registerCommand('myext.hello', () => {
                vscode.window.showInformationMessage('Hello from VSCode Extension Toolkit!');
            })
        ];
    }
}
```

### Creating a Tree View

```typescript
import { BaseTreeProvider, BaseTreeViewFeature } from 'vscode-extension-toolkit';

// 1. Define your tree data model
interface MyTreeItem {
    label: string;
    children?: MyTreeItem[];
}

// 2. Create a tree provider
class MyTreeProvider extends BaseTreeProvider<MyTreeItem> {
    getTreeItem(element: MyTreeItem): vscode.TreeItem {
        return {
            label: element.label,
            collapsibleState: element.children ? 
                vscode.TreeItemCollapsibleState.Collapsed : 
                vscode.TreeItemCollapsibleState.None
        };
    }

    getChildren(element?: MyTreeItem): MyTreeItem[] {
        if (!element) {
            // Return root items
            return [
                { label: 'Root Item 1', children: [{ label: 'Child 1' }] },
                { label: 'Root Item 2' }
            ];
        }
        return element.children || [];
    }
}

// 3. Create a tree view feature
class MyTreeFeature extends BaseTreeViewFeature<MyTreeItem, typeof MyTreeProvider> {
    protected ProviderClass = MyTreeProvider;
    protected viewId = 'myExtension.treeView';
}
```

### Advanced Command Handling

```typescript
import { CommandDefinition } from 'vscode-extension-toolkit';

// Define your commands with type safety
const Commands = {
    sayHello: new CommandDefinition('myext.sayHello'),
    showInfo: new CommandDefinition('myext.showInfo'),
    openFile: new CommandDefinition('myext.openFile')
} as const;

class MyFeature extends BaseFeature {
    protected registerCommands(): vscode.Disposable[] {
        return [
            // Register commands with automatic disposal
            Commands.sayHello.register(() => {
                vscode.window.showInformationMessage('Hello World!');
            }),
            
            Commands.showInfo.register((message: string) => {
                vscode.window.showInformationMessage(message);
            }),
            
            Commands.openFile.register(async () => {
                const uri = await vscode.window.showOpenDialog();
                if (uri) {
                    vscode.window.showTextDocument(uri[0]);
                }
            })
        ];
    }
}

// Execute commands programmatically
Commands.showInfo.execute('This is a programmatic message!');

// Create command URIs for use in webviews, markdown, etc.
const commandUri = Commands.sayHello.asUri();
```

### Composing Complex Features

```typescript
class DatabaseFeature extends BaseFeature {
    protected registerCommands(): vscode.Disposable[] {
        return [
            vscode.commands.registerCommand('myext.db.connect', this.connect.bind(this)),
            vscode.commands.registerCommand('myext.db.disconnect', this.disconnect.bind(this))
        ];
    }

    private connect() { /* implementation */ }
    private disconnect() { /* implementation */ }
}

class ApiFeature extends BaseFeature {
    protected subFeatures = [DatabaseFeature]; // Auto-activated!
    
    protected registerCommands(): vscode.Disposable[] {
        return [
            vscode.commands.registerCommand('myext.api.call', this.makeApiCall.bind(this))
        ];
    }

    private makeApiCall() { /* implementation */ }
}

class MainFeature extends BaseFeature {
    protected subFeatures = [ApiFeature]; // This will also activate DatabaseFeature
}
```

## 🏗️ Architecture

The toolkit is built around several core concepts:

### BaseContainer
The central container that holds your VS Code extension context and provides shared resources like output channels.

### BaseFeature  
The building block for extension functionality. Features can:
- Register commands, tree views, and event listeners
- Compose other sub-features
- Handle their own cleanup automatically

### BaseTreeProvider & BaseTreeViewFeature
Simplified tree view creation with built-in disposal management.

### CommandDefinition
Type-safe command management with utilities for programmatic execution and URI generation.

## 📚 Documentation

Comprehensive API documentation is available in the [`docs/`](./docs/markdown/index.md) directory, including:

- [API Reference](./docs/markdown/vscode-extension-toolkit.md)
- [BaseContainer](./docs/markdown/vscode-extension-toolkit.basecontainer.md)
- [BaseFeature](./docs/markdown/vscode-extension-toolkit.basefeature.md)
- [BaseTreeProvider](./docs/markdown/vscode-extension-toolkit.basetreeprovider.md)
- [BaseTreeViewFeature](./docs/markdown/vscode-extension-toolkit.basetreeviewfeature.md)
- [CommandDefinition](./docs/markdown/vscode-extension-toolkit.commanddefinition.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- 📖 Check the [documentation](./docs/markdown/index.md)
- 🐛 [Report bugs](https://github.com/your-repo/vscode-extension-toolkit/issues)
- 💡 [Request features](https://github.com/your-repo/vscode-extension-toolkit/issues)

---

Built with ❤️ for the VS Code extension development community.
