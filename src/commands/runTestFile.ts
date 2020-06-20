import { window, workspace } from "vscode";
import { findAppRoot } from "./utils";
import { relative } from "path";

const baseCommand = "mix test --trace";

export async function runTestFile() {
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
  terminal.sendText(`${baseCommand} ${relative(appRoot, fileName)}`);
}

async function findFiles(glob: string): Promise<string[]> {
  return workspace
    .findFiles(glob)
    .then((files) => files.map((file) => file.fsPath));
}
