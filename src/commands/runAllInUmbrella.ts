import { ExtensionContext, window } from "vscode";
import { findUmbrellaRoot, runCommand } from "./utils";

const baseCommand = "mix test --trace";

export async function runAllInUmbrella(context: ExtensionContext) {
  const activeEditor = window.activeTextEditor;

  if (!activeEditor) {
    window.showErrorMessage("No active Elixir file found. Aborting test run.");
    return;
  }

  const fileName = activeEditor.document.uri.fsPath;
  const appRoot = await findUmbrellaRoot(fileName);

  // TODO: If config is checked, cd to each child app and run tests

  if (appRoot === "") {
    window.showErrorMessage(
      "No umbrella root directory found. Aborting test run."
    );
  } else {
    runCommand(context, appRoot, baseCommand);
  }
}
