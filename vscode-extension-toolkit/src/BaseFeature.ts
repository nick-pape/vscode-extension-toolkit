import vscode from "vscode";
import { BaseContainer } from "./BaseContainer";

/**
 * @alpha
 */
export class BaseFeature implements vscode.Disposable {
  protected readonly subFeatures: typeof BaseFeature[] = [];
  protected readonly container: BaseContainer;
  protected readonly _disposables: vscode.Disposable[] = [];
  private _isActivated: boolean = false;

  public constructor(container: BaseContainer) {
    this.container = container;
    if (!this.container) {
      throw new Error("BaseContainer is not provided.");
    }
  }

  public activate(): void {
    if (this._isActivated) {
      throw new Error(
        `Feature ${this.constructor.name} is already activated.`
      );
    }

    this._disposables.push(
      ...this.registerTreeViews(),
      ...this.registerCommands(),
      ...this.registerEventListeners()
    );

    this.container.context.subscriptions.push(...this._disposables);

    this._disposables.push(...this.registerSubFeatures());
    this._isActivated = true;
  }

  public dispose(): void {
    for (const disposable of this._disposables) {
      disposable.dispose();
    }
  }

  protected registerSubFeatures(): Array<vscode.Disposable> {
    if (!this.container) {
      throw new Error("BaseContainer is not provided.");
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.subFeatures.map(SubFeature => {
      const subFeatureInstance = new SubFeature(this.container);
      subFeatureInstance.activate();
      return subFeatureInstance;
    });
  }

  protected registerTreeViews(): Array<vscode.Disposable> {
    return [];
  }
  protected registerCommands(): Array<vscode.Disposable> {
    return [];
  }
  protected registerEventListeners(): Array<vscode.Disposable> {
    return [];
  }
}

