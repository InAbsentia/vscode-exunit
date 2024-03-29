import { ExtensionContext, window } from "vscode";
import { findAppRoot, runCommand } from "./utils";

export async function runAll(
  context: ExtensionContext,
  extraFlags: Array<string> = []
) {
  const activeEditor = window.activeTextEditor;

  if (!activeEditor) {
    window.showErrorMessage("No active Elixir file found. Aborting test run.");
    return;
  }

  const fileName = activeEditor.document.uri.fsPath;
  const appRoot = await findAppRoot(fileName);

  if (appRoot === "") {
    window.showErrorMessage("No app root directory found. Aborting test run.");
  } else {
    runCommand(context, appRoot, extraFlags);
  }
}

export async function runAllFailed(context: ExtensionContext) {
  runAll(context, ["--failed"]);
}

export async function runAllStale(context: ExtensionContext) {
  runAll(context, ["--stale"]);
}
