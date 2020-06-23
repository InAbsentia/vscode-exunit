import { ExtensionContext, window } from "vscode";
import { findAppRoot, runCommand } from "./utils";
import { relative } from "path";

const baseCommand = "mix test";
const notFoundMessage = "No active Elixir test file found. Aborting test run.";

export async function runTest(context: ExtensionContext) {
  const activeEditor = window.activeTextEditor;

  if (!activeEditor) {
    window.showErrorMessage(notFoundMessage);
    return;
  }

  const fileName = activeEditor.document.fileName;
  const lineNumber = activeEditor.selection.active.line + 1;
  if (!fileName.endsWith("_test.exs")) {
    window.showErrorMessage(notFoundMessage);
    return;
  }

  const appRoot = await findAppRoot(fileName);
  if (appRoot === "") {
    window.showErrorMessage("No app root directory found. Aborting test run.");
  } else {
    runCommand(
      context,
      appRoot,
      `${baseCommand} ${relative(appRoot, fileName)}:${lineNumber}`
    );
  }
}
