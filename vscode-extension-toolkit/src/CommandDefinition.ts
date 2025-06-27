import * as vscode from 'vscode';

/** @alpha */
// eslint-disable-next-line @rushstack/no-new-null
export type ISerializable = string | number | boolean | null | undefined | ISerializable[] | { [key: string]: ISerializable };

/**
 * @alpha
 */
export class CommandDefinition {
  public readonly id: string;
  private _isRegistered: boolean = false;

  public constructor(id: string) {
    this.id = id;
  }

  public static areAllRegistered(commands: {[key: string]: CommandDefinition}): boolean {
    return Object.values(commands).every(command => command.isRegistered);
  }

  public register(cb: (...args: unknown[]) => void): vscode.Disposable {
    if (this._isRegistered) {
      throw new Error(`Command '${this.id}' is already registered.`);
    }

    this._isRegistered = true;
    return vscode.commands.registerCommand(this.id, cb);
  }

  public get isRegistered(): boolean {
    return this._isRegistered;
  }

  /**
   * Creates a VSCode command URI with optional arguments.
   * Can be used in markdown links, buttons, etc.
   */
  public asUri(...args: ISerializable[]): vscode.Uri {
    const encoded = encodeURIComponent(JSON.stringify(args));
    return vscode.Uri.parse(`command:${this.id}?${encoded}`);
  }

  /**
   * Triggers the command programmatically with the given arguments.
   */
  public execute(...args: unknown[]): Thenable<unknown> {
    return vscode.commands.executeCommand(this.id, ...args);
  }

  /**
   * Returns the string ID of the command.
   */
  public toString(): string {
    return this.id;
  }
}