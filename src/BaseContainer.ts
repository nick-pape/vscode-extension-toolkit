import * as vscode from "vscode";

/**
 * @alpha
 */
export class BaseContainer implements vscode.Disposable {
  private static _instance: BaseContainer;
  private _vscodeContext: vscode.ExtensionContext;

  protected _outputChannel: vscode.OutputChannel;

  protected _disposables: vscode.Disposable[] = [];

  public constructor(context: vscode.ExtensionContext) {
    this._vscodeContext = context;
    this._outputChannel = vscode.window.createOutputChannel("Rush");

    this._disposables = [
      this._outputChannel
    ];
  }

  public static initialize(context: vscode.ExtensionContext): BaseContainer {
    BaseContainer._instance = new BaseContainer(context);
    return BaseContainer._instance;
  }

  public static getInstance(): BaseContainer {
    return BaseContainer._instance;
  }

  public get outputChannel(): vscode.OutputChannel {
    return this._outputChannel;
  }
  
  public get context(): vscode.ExtensionContext {
    return this._vscodeContext;
  }

  public dispose(): void {
    for (const disposable of this._disposables) {
      disposable.dispose();
    }
  }
}