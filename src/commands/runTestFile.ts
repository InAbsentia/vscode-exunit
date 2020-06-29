import { relative } from "path";
import { ExtensionContext, window } from "vscode";
import { findAppRoot, runCommand } from "./utils";

const baseCommand = "mix test";

export async function runTestFile(context: ExtensionContext) {
  const activeEditor = window.activeTextEditor;

  if (!activeEditor) {
    window.showErrorMessage(
      "No active Elixir test file found. Aborting test run."
    );
    return;
  }

  const fileName = activeEditor.document.uri.fsPath;
  if (!fileName.endsWith("_test.exs")) {
    return;
  }

  const appRoot = await findAppRoot(fileName);
  if (appRoot === "") {
    window.showErrorMessage("No app root directory found. Aborting test run.");
  } else {
    runCommand(context, appRoot, relative(appRoot, fileName));
  }
}
