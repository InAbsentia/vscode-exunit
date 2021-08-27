import { Uri, window } from "vscode";
import * as path from "path";
import * as assert from "assert";
import * as subject from "../../../commands/utils";

suite("ExUnit Utils", () => {
  window.showInformationMessage("Start utils tests.");

  test("When no mix.exs is found", async () => {
    const testFilePath = path.resolve(
      __dirname,
      "non_umbrella/test/lib/my_test.exs"
    );
    const mixfiles: string[] = [];

    const appRoot = await subject.findAppRoot(
      testFilePath,
      async () => mixfiles
    );

    assert.strictEqual(appRoot, "");
  });

  test("Finding the app root in a non-umbrella app", async () => {
    const testFilePath = path.resolve(
      __dirname,
      "non_umbrella/test/lib/my_test.exs"
    );
    const mixfiles = [path.resolve(__dirname, "mix.exs")];
    const expectedAppRoot = __dirname;

    const appRoot = await subject.findAppRoot(
      testFilePath,
      async () => mixfiles
    );

    assert.strictEqual(appRoot, expectedAppRoot);
  });

  test("Finding the app root in an umbrella app", async () => {
    const testFilePath = path.resolve(
      __dirname,
      "umbrella/apps/two/test/lib/my_test.exs"
    );
    const mixfiles = [
      path.resolve(__dirname, "umbrella/mix.exs"),
      path.resolve(__dirname, "umbrella/apps/one/mix.exs"),
      path.resolve(__dirname, "umbrella/apps/two/mix.exs"),
    ];
    const expectedAppRoot = path.resolve(__dirname, "umbrella/apps/two");

    const appRoot = await subject.findAppRoot(
      testFilePath,
      async () => mixfiles
    );

    assert.strictEqual(appRoot, expectedAppRoot);
  });

  test("Finding the umbrella root", async () => {
    const testFilePath = path.resolve(
      __dirname,
      "umbrella/apps/one/test/lib/my_test.exs"
    );
    const mixfiles = [
      path.resolve(__dirname, "other/apps/one/mix.exs"),
      path.resolve(__dirname, "umbrella/apps/one/mix.exs"),
      path.resolve(__dirname, "umbrella/mix.exs"),
      path.resolve(__dirname, "umbrella/apps/two/mix.exs"),
    ];
    const expectedUmbrellaRoot = path.resolve(__dirname, "umbrella");

    const umbrellaRoot = await subject.findUmbrellaRoot(
      testFilePath,
      async () => mixfiles
    );

    assert.strictEqual(umbrellaRoot, expectedUmbrellaRoot);
  });

  test("Building the exunit command", async () => {
    const command = subject.buildCommand([], "test/foo_test.exs");
    assert.strictEqual(command, "mix test --color test/foo_test.exs");
  });

  test("Building the exunit command with a line number", async () => {
    const command = subject.buildCommand([], "test/foo_test.exs", 27);
    assert.strictEqual(command, "mix test --color test/foo_test.exs:27");
  });

  test("Building the exunit command with a line number and extra flags", async () => {
    const command = subject.buildCommand(
      ["--stale", "--failed"],
      "test/foo_test.exs",
      27
    );
    assert.strictEqual(
      command,
      "mix test --color --stale --failed test/foo_test.exs:27"
    );
  });
});
