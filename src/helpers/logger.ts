import { appendFileSync } from "fs";
import path from "path";
import os from "os";

export const logError = (error: any) => {
  try {
    appendFileSync(
      path.join(os.homedir(), "logs.spotifyCLI"),
      JSON.stringify({
        timestamp: new Date().toISOString(),
        error: error,
      })
    );
  } catch (error) {
    console.log(
      "Error logging error to log file. Error:",
      JSON.stringify(error)
    );
  }
};
