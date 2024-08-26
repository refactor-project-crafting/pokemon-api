import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 3000;

startServer(Number(port));
