import * as vscode from "vscode";
import { O_SYMLINK } from "constants";

export async function runTestFile() {
  const activeEditor = vscode.window.activeTextEditor;

  if (!activeEditor) {
    return;
  }

  const file = activeEditor.document.uri;
  if (!file.fsPath.endsWith("_test.exs")) {
    return;
  }

  const output = vscode.window.createOutputChannel("ExUnit");
  const appRoot = await findAppRoot(file, output);
  const relativePath = file.fsPath.replace(`${appRoot}/`, "");
  const command = `mix test --trace ${relativePath}`;

  const terminal = vscode.window.createTerminal({
    name: "ExUnit",
    cwd: appRoot,
  });
  terminal.show();
  terminal.sendText(command);
}

async function findAppRoot(
  file: vscode.Uri,
  output: vscode.OutputChannel
): Promise<string | undefined> {
  output.appendLine(file.fsPath);
  output.appendLine("");

  let mixFiles = await vscode.workspace.findFiles("**/mix.exs");

  if (mixFiles && mixFiles.length > 0) {
    let appDir = mixFiles.reduce((acc: string, uri: vscode.Uri): string => {
      let uriDir = uri.fsPath.split("/").slice(0, -1).join("/");
      output.appendLine(uriDir);
      output.appendLine(`Matches? ${file.fsPath.includes(uriDir)}`);
      output.appendLine("");
      if (file.fsPath.includes(uriDir) && uriDir.length > acc.length) {
        return uriDir;
      } else {
        return acc;
      }
    }, "");

    return appDir;
  } else {
    return "";
  }
}
