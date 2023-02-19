import { writeToConfig } from "../helpers/writeToConfig";

export const saveClientCredentials = async ({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}): Promise<void> => {
  // Override client credentials
  writeToConfig({
    clientId: clientId,
    clientSecret: clientSecret,
  });
};
