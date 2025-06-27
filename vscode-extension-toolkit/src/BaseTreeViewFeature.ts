import * as vscode from "vscode";
import { BaseFeature } from "./BaseFeature";
import { BaseContainer } from "./BaseContainer";
import { BaseTreeProvider } from "./BaseTreeProvider";

/**
 * @alpha
 */
export type Constructor<T, A extends unknown[] = unknown[]> = new (...args: A) => T;

/**
 * @alpha
 */
export abstract class BaseTreeViewFeature<
ItemType,
ProviderCtor extends Constructor<BaseTreeProvider<ItemType>>
> extends BaseFeature {
  protected _provider!: InstanceType<ProviderCtor>;
  protected _treeView!: vscode.TreeView<ItemType>;

  protected abstract ProviderClass: ProviderCtor;
  protected abstract viewId: string;

  public constructor(container: BaseContainer) {
    super(container);
  }

  protected override registerTreeViews(): vscode.Disposable[] {
    this._provider = new this.ProviderClass(this.container) as InstanceType<ProviderCtor>;
    this._treeView = vscode.window.createTreeView(this.viewId, {
      treeDataProvider: this._provider,
    });
    return [this._treeView];
  }
}

