import { Uri, window } from "vscode";
import * as path from "path";
import * as assert from "assert";
import * as subject from "../../../commands/utils";

suite("ExUnit Utils", () => {
  window.showInformationMessage("Start utils tests.");

  test("Finding the app root in a non-umbrella app", async () => {
    const testFilePath = path.resolve(
      __dirname,
      "non_umbrella/test/lib/my_test.exs"
    );
    const testFileUri = Uri.file(testFilePath);
    const mixfile = Uri.file(path.resolve(__dirname, "mix.exs"));
    const expectedAppRoot = __dirname;

    const appRoot = await subject.findAppRoot(testFileUri, async () => [
      mixfile,
    ]);

    assert.strictEqual(appRoot, expectedAppRoot);
  });

  test("Finding the app root in an umbrella app", async () => {
    const testFilePath = path.resolve(
      __dirname,
      "umbrella/apps/one/test/lib/my_test.exs"
    );
    const testFileUri = Uri.file(testFilePath);
    const mixfiles = [
      Uri.file(path.resolve(__dirname, "umbrella/apps/one/mix.exs")),
      Uri.file(path.resolve(__dirname, "umbrella/apps/two/mix.exs")),
    ];
    const expectedAppRoot = path.resolve(__dirname, "umbrella/apps/one");

    const appRoot = await subject.findAppRoot(
      testFileUri,
      async () => mixfiles
    );

    assert.strictEqual(appRoot, expectedAppRoot);
  });
});
