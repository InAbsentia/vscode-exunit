import { window } from "vscode";
import { findUmbrellaRoot, runCommand } from "./utils";

const baseCommand = "mix test --trace";

export async function runAllInUmbrella() {
  const activeEditor = window.activeTextEditor;

  if (!activeEditor) {
    window.showErrorMessage("No active Elixir file found. Aborting test run.");
    return;
  }

  const fileName = activeEditor.document.uri.fsPath;
  const appRoot = await findUmbrellaRoot(fileName);

  if (appRoot === "") {
    window.showErrorMessage(
      "No umbrella root directory found. Aborting test run."
    );
  } else {
    runCommand(appRoot, baseCommand);
  }
}
