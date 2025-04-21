import "dotenv/config";
import createDebug from "debug";
import app from "./app.js";

const debug = createDebug("pokemon:server:start");

const startServer = (port: number): void => {
  app.listen(port, () => {
    debug(`Listening on http://localhost:${port}`);
  });
};

export default startServer;
