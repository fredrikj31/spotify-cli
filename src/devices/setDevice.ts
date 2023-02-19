import inquirer from "inquirer";
import { writeToConfig } from "../helpers/writeToConfig";
import { Device } from "../interfaces";
import { listDevices } from "./listDevices";

export const setDevice = (device: Device) => {
  writeToConfig({ deviceId: device.id });
  console.log(`Successfully set device to: ${device.name}`);
};

export const displaySetDevice = async (): Promise<void> => {
  const devices = await listDevices();
  const deviceNames = devices.map((device: Device) => {
    return device.name;
  });
  await inquirer
    .prompt({
      name: "selectedDevice",
      type: "list",
      message: "Which device do you want to control\n",
      choices: [...deviceNames],
    })
    .then((result) => {
      const selectedDevice = devices.map((device: Device) => {
        if (device.name === result.selectedDevice) return device;
      });
      if (!selectedDevice[0]) {
        console.log("Could not set active device.");
        return;
      }
      setDevice(selectedDevice[0]);
    });
};
