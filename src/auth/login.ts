import axios from "axios";
import http from "http";
import url from "url";
import getConfig from "../helpers/getConfig";
import { writeToConfig } from "../helpers/writeToConfig";

export const login = async () => {
  const config = getConfig();

  const state = "OeKeJ2VaJfHAuY89";
  const scopes =
    "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read";

  let code = "";

  const server = http.createServer().listen(8000);

  server.addListener("request", async (req, res) => {
    const reqUrl = url.parse(req.url || "");
    if (reqUrl.pathname == "/callback") {
      const url = new URL("http://localhost:8000" + req.url || "");
      code = url.searchParams.get("code") || "no-code";
      res.write("Success. You can now close this tab :)");
      res.end();
      server.closeAllConnections();
      server.close();

      try {
        const result = await axios.post(
          "https://accounts.spotify.com/api/token",
          {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "http://localhost:8000/callback",
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization:
                "Basic " +
                Buffer.from(
                  config.clientId + ":" + config.clientSecret
                ).toString("base64"),
            },
          }
        );
        const response = result.data;
        console.log(JSON.stringify(response));
        writeToConfig({
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          expireDate: new Date(
            Date.now() + response.expires_in * 1000
          ).toISOString(),
        });
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    }
  });

  console.log(
    encodeURI(
      `https://accounts.spotify.com/authorize?response_type=code&client_id=${config.clientId}&scope=${scopes}&redirect_uri=http://localhost:8000/callback&state=${state}`
    )
  );
};
