#!/usr/bin/env node
import { Command } from "commander";

// CLI
const program = new Command();

program
  .name("spotify")
  .description(
    "A CLI tool, you can use to control your Spotify, without leaving the terminal."
  )
  .version("1.0.0");

program.command("hello").action(async () => {
  console.log("Hello World from Spotify CLI");
});

program.parse();
