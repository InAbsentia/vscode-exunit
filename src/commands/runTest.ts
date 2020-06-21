import { window } from "vscode";
import { findAppRoot, runCommand } from "./utils";
import { relative } from "path";

const baseCommand = "mix test --trace";

export async function runTest() {
  const activeEditor = window.activeTextEditor;

  if (!activeEditor) {
    window.showErrorMessage(
      "No active Elixir test file found. Aborting test run."
    );
    return;
  }

  const fileName = activeEditor.document.fileName;
  const lineNumber = activeEditor.selection.active.line + 1;
  if (!fileName.endsWith("_test.exs")) {
    return;
  }

  const appRoot = await findAppRoot(fileName);
  if (appRoot === "") {
    window.showErrorMessage("No app root directory found. Aborting test run.");
  } else {
    runCommand(
      appRoot,
      `${baseCommand} ${relative(appRoot, fileName)}:${lineNumber}`
    );
  }
}
