import { commands, ExtensionContext } from "vscode";

import { runTest } from "./commands/runTest";
import { runTestFile } from "./commands/runTestFile";
import { runAll, runAllStale, runAllFailed } from "./commands/runAll";
import { runAllInUmbrella } from "./commands/runAllInUmbrella";
import { runPrevious } from "./commands/runPrevious";

const allCommands = [
  runTest,
  runTestFile,
  runAll,
  runAllInUmbrella,
  runAllFailed,
  runAllStale,
  runPrevious,
];

const commandWithContext = (
  command: Function,
  context: ExtensionContext
) => () => command(context);

export function activate(context: ExtensionContext) {
  allCommands.forEach((command) => {
    let disposable = commands.registerCommand(
      `exunit.${command.name}`,
      commandWithContext(command, context)
    );

    context.subscriptions.push(disposable);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
