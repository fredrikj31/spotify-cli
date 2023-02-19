import { readFileSync, existsSync, writeFileSync } from "fs";
import os from "os";
import path from "path";
import { Config } from "../interfaces";
import { logError } from "./logger";

const getConfig = (): Config => {
  const filePath = path.join(os.homedir(), ".spotifyCLI");
  const fileExists = existsSync(filePath);
  if (!fileExists) {
    try {
      writeFileSync(filePath, JSON.stringify({} as Config));
    } catch (error) {
      logError(error);
      throw new Error("Error while creating config file.");
    }
  }

  try {
    const fileContent = readFileSync(filePath, {
      encoding: "utf-8",
    });

    const result = JSON.parse(fileContent) as Config;
    return result;
  } catch (error) {
    logError(error);
    throw new Error("Error while loading config.");
  }
};

export default getConfig;
