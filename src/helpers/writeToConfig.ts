import path from "path";
import os from "os";
import { writeFileSync } from "fs";

import { Config } from "../interfaces";
import getConfig from "./getConfig";
import { logError } from "./logger";

export const writeToConfig = (config: Partial<Config>) => {
  const currentConfig = getConfig();

  const newConfig = { ...currentConfig, ...config };
  try {
    writeFileSync(
      path.join(os.homedir(), "/.spotifyCLI"),
      JSON.stringify(newConfig)
    );
    console.log("Successfully saved config file.");
  } catch (error) {
    logError(error);
    throw new Error("Error while trying to save config file.");
  }
};
