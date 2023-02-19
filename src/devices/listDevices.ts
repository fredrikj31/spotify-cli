import axios from "axios";
import refreshToken from "../auth/refreshToken";
import getConfig from "../helpers/getConfig";
import { Device } from "../interfaces";

export const listDevices = async (): Promise<Device[]> => {
  await refreshToken();
  const config = getConfig();

  try {
    const result = await axios.get(
      "https://api.spotify.com/v1/me/player/devices",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + config.accessToken,
        },
      }
    );

    const response = result.data;
    const devices: Device[] = [];
    for (const device of response.devices) {
      devices.push({
        id: device.id,
        isActive: device.is_active,
        isPrivateSession: device.is_private_session,
        isRestricted: device.is_restricted,
        name: device.name,
        type: device.type,
        volumen: device.volume_percent,
      });
    }
    return devices;
  } catch (error) {
    // logError(error);
    console.error(error);
    throw new Error("Error while trying to fetch users devices");
  }
};

export const displayListDevices = async () => {};
