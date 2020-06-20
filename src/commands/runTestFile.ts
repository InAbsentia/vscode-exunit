import { window, workspace } from "vscode";
import { findAppRoot } from "./utils";
import { relative } from "path";

const baseCommand = "mix test --trace";

export async function runTestFile() {
  const activeEditor = window.activeTextEditor;

  if (!activeEditor) {
    return;
  }

  const file = activeEditor.document.uri;
  if (!file.fsPath.endsWith("_test.exs")) {
    return;
  }

  const appRoot = await findAppRoot(file.fsPath, findFiles);
  if (appRoot === "") {
    window.showErrorMessage("No app root directory found. Aborting test run.");
    return;
  }

  const terminal = window.createTerminal({
    name: "ExUnit Test Run",
    cwd: appRoot,
  });
  terminal.show();
  terminal.sendText(`${baseCommand} ${relative(appRoot, file.fsPath)}`);
}

async function findFiles(glob: string): Promise<string[]> {
  return workspace
    .findFiles(glob)
    .then((files) => files.map((file) => file.fsPath));
}
