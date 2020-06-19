import * as vscode from "vscode";

import { runTest } from "./commands/runTest";
import { runTestFile } from "./commands/runTestFile";
import { runAll } from "./commands/runAll";
import { runAllInUmbrella } from "./commands/runAllInUmbrella";
import { runPrevious } from "./commands/runPrevious";

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // let output = vscode.window.createOutputChannel("ExUnit");
  [runTest, runTestFile, runAll, runAllInUmbrella, runPrevious].forEach(
    (command) => {
      let disposable = vscode.commands.registerCommand(
        `exunit.${command.name}`,
        command
      );

      context.subscriptions.push(disposable);
    }
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
