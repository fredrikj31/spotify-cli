import axios from "axios";
import refreshToken from "../auth/refreshToken";
import getConfig from "../helpers/getConfig";
import msToTime from "../helpers/msToTime";
import { PlayingStatus } from "../interfaces";

export const getStatus = async (): Promise<PlayingStatus> => {
  await refreshToken();
  const config = getConfig();

  try {
    const result = await axios.get("https://api.spotify.com/v1/me/player", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + config.accessToken,
      },
    });

    const response = result.data;
    return {
      isPlaying: response.is_playing,
      duration: response.item.duration_ms,
      progress: response.progress_ms,
      artist: response.item.artists[0].name,
      song: response.item.name,
      volumen: response.device.volume_percent,
      shuffle: response.shuffle_state,
      repeat: response.repeat_state,
    };
  } catch (error) {
    // logError(error);
    console.error(error);
    throw new Error("Error while trying to fetch users playlists");
  }
};

export const displayGetStatus = async () => {
  const result = await getStatus();
  console.log(
    `${result.isPlaying === true ? "Playing" : "Paused"}: ${result.song} by ${
      result.artist
    } at volumen: ${result.volumen}`
  );
  console.log(
    `Time of song: ${msToTime(result.progress)} / ${msToTime(result.duration)}`
  );

  const procent = Math.round(((result.progress / result.duration) * 100) / 4);

  let progressString = "";
  for (let index = 0; index < 25; index++) {
    if (index < procent) {
      progressString += "=";
    } else {
      progressString += " ";
    }
  }

  console.log(`Progress: [${progressString}]`);
};
