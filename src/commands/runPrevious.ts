import { ExtensionContext } from "vscode";
import { runLastCommand } from "./utils";

export function runPrevious(context: ExtensionContext) {
  runLastCommand(context);
}
