import axios from "axios";
import getConfig from "../helpers/getConfig";
import { logError } from "../helpers/logger";
import { writeToConfig } from "../helpers/writeToConfig";

const refreshToken = async () => {
  const config = getConfig();

  if (new Date(config.expireDate).getTime() > new Date().getTime()) {
    return;
  }

  try {
    const result = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "refresh_token",
        refresh_token: config.refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(config.clientId + ":" + config.clientSecret).toString(
              "base64"
            ),
        },
      }
    );

    const response = result.data;
    writeToConfig({
      accessToken: response.access_token,
      expireDate: new Date(
        Date.now() + response.expires_in * 1000
      ).toISOString(),
    });
  } catch (error) {
    logError(error);
    console.error(error);
    throw new Error("Error while trying to refresh the access token");
  }
};

export default refreshToken;
