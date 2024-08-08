import startServer from "./startServer.js";

const port = process.env.PORT ?? 3000;

startServer(Number(port));
