import { dirname, relative } from "path";
import { window, workspace, Terminal } from "vscode";

const defaultRoot = "";
const terminalName = "ExUnit Test Run";

const getTerminal = (cwd: string): Terminal => {
  let terminal = window.terminals.find((term) => term.name === terminalName);

  if (terminal) {
    terminal.sendText(`cd ${cwd}`);
  } else {
    terminal =
      terminal || window.createTerminal({ name: terminalName, cwd: cwd });
  }

  return terminal;
};

const getConfigValue = (key: string): any =>
  workspace.getConfiguration("exunit").get(key);

const isInDirectory = (dir: string, file: string): Boolean =>
  !relative(dir, file).startsWith("..");

const isCloserToFile = (dir: string, otherDir: string): Boolean =>
  dir.length > otherDir.length;

export function runCommand(dir: string, command: string): void {
  const terminal = getTerminal(dir);
  if (getConfigValue("clearBetweenRuns")) terminal.sendText("clear");

  terminal.sendText(command);
  terminal.show(true);
}

export async function findAppRoot(
  filePath: string,
  finder: (glob: string) => Promise<string[]>
): Promise<string> {
  const mixFiles = await finder("**/mix.exs");

  if (!mixFiles || mixFiles.length <= 0) {
    return defaultRoot;
  }

  return mixFiles.reduce((acc: string, uri: string): string => {
    const dir = dirname(uri);

    if (isInDirectory(dir, filePath) && isCloserToFile(dir, acc)) {
      return dir;
    } else {
      return acc;
    }
  }, defaultRoot);
}
