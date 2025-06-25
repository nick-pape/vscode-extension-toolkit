import * as fs from 'fs';
import * as path from 'path';

const root: string = path.resolve(__dirname, '..');
const pkgPath: string = path.join(root, 'package.json');
const outputPath: string = path.join(root, 'src', 'commands.ts');

const pkg: {
    contributes?: {
        commands?: Array<{ command: string }>;
        menus?: {
            'commandPalette'?: Array<{ command: string }>;
            'view/title'?: Array<{ command: string }>;
            'view/item/context'?: Array<{ command: string }>;
        };
        keybindings?: Array<{ command: string }>;
    }
} = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

const commands: Array<{ command: string }> = pkg.contributes?.commands ?? [];
const allMenus: Array<{ command: string }> = [
  ...(pkg.contributes?.menus?.commandPalette ?? []),
  ...(pkg.contributes?.menus?.['view/title'] ?? []),
  ...(pkg.contributes?.menus?.['view/item/context'] ?? []),
  ...(pkg.contributes?.keybindings ?? [])
];

const usedCommands: Set<string> = new Set(allMenus.map(m => m.command));
const unused: Array<{ command: string }> = commands.filter(cmd => !usedCommands.has(cmd.command));

const lines: Array<string> = [];
lines.push(`// AUTO-GENERATED FILE. DO NOT EDIT.`);
lines.push(`// Run \`npm run generate:commands\` to regenerate.\n`);
lines.push(`import { CommandDefinition } from './CommandDefinition';\n`);
lines.push(`export const Commands = {`);

for (const cmd of commands) {
  const key: string = cmd.command
    .replace(/^.*?\./, '')
    .replace(/[^a-zA-Z0-9]/g, '_');
  lines.push(`  ${key}: new CommandDefinition('${cmd.command}'),`);
}

lines.push(`} as const;\n`);
lines.push(`export type CommandId = keyof typeof Commands;\n`);

fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');

if (unused.length > 0) {
  console.warn(`\n⚠️ Unused commands in package.json:`);
  unused.forEach(cmd => console.warn(` - ${cmd.command}`));
  console.warn();
}
