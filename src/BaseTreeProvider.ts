import * as vscode from "vscode";
import { BaseContainer } from "./BaseContainer";

/**
 * @alpha
 */
export abstract class BaseTreeProvider<T> implements vscode.TreeDataProvider<T>, vscode.Disposable {
  protected container: BaseContainer;

  private _disposables: vscode.Disposable[] = [];

  public constructor(container: BaseContainer) {
    this.container = container;
  }

  public dispose(): void {
    for (const disposable of this._disposables) {
        disposable.dispose();
    }
  }

  public abstract getTreeItem(element: T): vscode.TreeItem;
  public abstract getChildren(element?: T): vscode.ProviderResult<T[]>;
}