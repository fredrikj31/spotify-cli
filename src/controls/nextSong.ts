import axios from "axios";
import refreshToken from "../auth/refreshToken";
import getConfig from "../helpers/getConfig";
import { displayGetStatus } from "./getStatus";

export const nextSong = async () => {
  await refreshToken();
  const config = getConfig();

  if (!config.deviceId) {
    console.log(
      "You haven't selected a device. You can do it with (spotify device --set)"
    );
    return;
  }

  try {
    await axios.post(
      "https://api.spotify.com/v1/me/player/next",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + config.accessToken,
        },
        params: {
          device_id: config.deviceId,
        },
      }
    );
  } catch (error) {
    // logError(error);
    console.error(error);
    throw new Error("Error while trying to play next song");
  }
};

export const displayNextSong = async () => {
  await nextSong();
  setTimeout(async () => {
    await displayGetStatus();
  }, 1000);
};
