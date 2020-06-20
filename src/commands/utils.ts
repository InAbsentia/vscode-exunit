import { dirname, relative } from "path";

const defaultRoot = "";

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

function isInDirectory(dir: string, file: string): Boolean {
  return !relative(dir, file).startsWith("..");
}

function isCloserToFile(dir: string, otherDir: string): Boolean {
  return dir.length > otherDir.length;
}
