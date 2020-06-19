import * as vscode from "vscode";

import { runTest } from "./commands/runTest";
import { runTestFile } from "./commands/runTestFile";
import { runAll } from "./commands/runAll";
import { runAllInUmbrella } from "./commands/runAllInUmbrella";
import { runPrevious } from "./commands/runPrevious";

const allCommands = [
  runTest,
  runTestFile,
  runAll,
  runAllInUmbrella,
  runPrevious,
];

export function activate(context: vscode.ExtensionContext) {
  allCommands.forEach((command) => {
    let disposable = vscode.commands.registerCommand(
      `exunit.${command.name}`,
      command
    );

    context.subscriptions.push(disposable);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
