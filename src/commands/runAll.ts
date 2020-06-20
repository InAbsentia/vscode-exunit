import { window, workspace } from "vscode";
import { findAppRoot } from "./utils";

const baseCommand = "mix test --trace";

export async function runAll() {
  const activeEditor = window.activeTextEditor;

  if (!activeEditor) {
    window.showErrorMessage("No active Elixir file found. Aborting test run.");
    return;
  }

  const fileName = activeEditor.document.uri.fsPath;
  const appRoot = await findAppRoot(fileName, findFiles);

  if (appRoot === "") {
    window.showErrorMessage("No app root directory found. Aborting test run.");
    return;
  }

  const terminal = window.createTerminal({
    name: "ExUnit Test Run",
    cwd: appRoot,
  });
  terminal.show(true);
  terminal.sendText(`${baseCommand}`);
}

async function findFiles(glob: string): Promise<string[]> {
  return workspace
    .findFiles(glob)
    .then((files) => files.map((file) => file.fsPath));
}
