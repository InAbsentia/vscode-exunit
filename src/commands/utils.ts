import * as vscode from "vscode";

export async function findAppRoot(
  file: vscode.Uri,
  finder: (glob: string) => Thenable<vscode.Uri[]>
): Promise<string | null> {
  const mixFiles = await finder("**/mix.exs");

  if (mixFiles && mixFiles.length > 0) {
    const appDir = mixFiles.reduce((acc: string | null, uri: vscode.Uri):
      | string
      | null => {
      const uriDir = uri.fsPath.split("/").slice(0, -1).join("/");

      if (file.fsPath.includes(uriDir) && uriDir.length > (acc || "").length) {
        return uriDir;
      } else {
        return acc;
      }
    }, null);

    return appDir;
  } else {
    return null;
  }
}
