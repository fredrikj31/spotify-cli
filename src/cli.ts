#!/usr/bin/env node
import { Command } from "commander";
import omelette from "omelette";
import { login } from "./auth/login";
import { saveClientCredentials } from "./client";

import * as completionTree from "./completionTree";
import { listDevices } from "./devices/listDevices";
import getPlaylists from "./playlists/getPlaylists";
import { displaySetDevice } from "./devices/setDevice";
import { displayNextSong } from "./controls/nextSong";
import { displayGetStatus } from "./controls/getStatus";
import { displayPrevSong } from "./controls/prevSong";

const completion = omelette("spotify").tree(completionTree);
completion.init();

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

program
  .command("client")
  .requiredOption("-i, --clientId <clientId>")
  .requiredOption("-s, --clientSecret <clientSecret>")
  .action(async (opts) => {
    saveClientCredentials({
      clientId: opts.clientId,
      clientSecret: opts.clientSecret,
    });
  });

// Auth Command
program
  .command("auth")
  .option("-s, --setup", "Authenticate your client into the app")
  .action(async (opts) => {
    if (opts.setup) {
      try {
        await login();
      } catch (error) {
        console.log(error);
      }
    }
  });

program.command("playlists").action(async () => {
  await getPlaylists();
});

program
  .command("queue")
  .option("-n, --next")
  .option("-p, --prev")
  .action(async (opts) => {
    if (opts.next) await displayNextSong();
    if (opts.prev) await displayPrevSong();
  });

program
  .command("device")
  .option("-l, --list")
  .option("-s, --set")
  .action(async (opts) => {
    if (opts.list) {
      await listDevices();
    } else if (opts.set) {
      await displaySetDevice();
    } else {
      console.log("Unknown option");
    }
  });

program.command("status").action(async () => {
  await displayGetStatus();
});

program.parse(process.argv);
