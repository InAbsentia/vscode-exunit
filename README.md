# ExUnit VSCode Extension

## Features

Run your Elixir project's ExUnit tests in VS Code's terminal.

Access the available commands using `⌘-/Ctrl-⇧-p` (no default keybindings):

1. ExUnit: Run test under cursor
1. ExUnit: Run the current test file
1. ExUnit: Run all tests in current app
   - Child app when in an umbrella
   - Full app when not in an umbrella
1. ExUnit: Run all tests in umbrella app
1. ExUnit: Re-run the previous test
   - Run the same command in the same app directory
   - Persists across restarts

## Requirements

You must have an Elixir test or code file open and active in your editor workspace
and the file must be inside an Elixir project with a `mix.exs` file.
It won't work with standalone `.ex{s}` files.

## Extension Settings

This extension contributes the following settings:

- `exunit.clearBetweenRuns`: Specify whether the terminal should be cleared between test runs
- `exunit.saveAllBeforeRun`: Specify whether to save all files before running tests

## Known Issues

When running all tests in an umbrella app,
the extension simply runs `mix test` from the root of your application.
It doesn't currently accomodate running tests for all child apps separately.

## Release Notes

### 0.1.5

When clearing screen, clear scrollback, as well.

### 0.1.4

Build the test command from components.
Pass `--color` flag, by default.

### 0.1.3

Don't pass the `--trace` flag to `mix test`.

### 0.1.1 - 0.1.2

Documentation updates.

### 0.1.0

Initial release

---
