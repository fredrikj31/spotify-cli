import axios from "axios";
import refreshToken from "../auth/refreshToken";
import getConfig from "../helpers/getConfig";
import { logError } from "../helpers/logger";

const getPlaylists = async () => {
  await refreshToken();
  const config = getConfig();

  try {
    const result = await axios.get("https://api.spotify.com/v1/me/playlists", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + config.accessToken,
      },
    });

    const response = result.data;
  } catch (error) {
    // logError(error);
    console.error(error);
    throw new Error("Error while trying to fetch users playlists");
  }
};

export default getPlaylists;
