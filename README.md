# ExUnit VSCode Extension

## Features

Run your Elixir project's ExUnit tests in VS Code's terminal:

1. Run only the test under the cursor
1. Run only the active test file
1. Run all tests in your current app (child app when in an umbrella)
1. Run all tests in your umbrella app
1. Re-run the most recent command (persists across restarts)

## Requirements

You must have an Elixir test or code file open and active in your editor workspace
and the file must be inside an Elixir project (has a `mix.exs` file).
It won't work with standalone `.exs` files.

## Extension Settings

This extension contributes the following settings:

- `exunit.clearBetweenRuns`: Specify whether the terminal should be cleared between test runs

## Known Issues

When running all tests in an umbrella app,
the extension simply runs `mix test` from the root of your application.
It doesn't currently accomodate running tests for all child apps separately.

## Release Notes

### 0.0.1

Initial release

---
