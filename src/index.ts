import "dotenv/config";
import createDebug from "debug";
import chalk from "chalk";
import startServer from "./server/startServer.js";
import connectToDatabase from "./database/connectToDatabase.js";

const debug = createDebug("pokemon:root");

const port = process.env.PORT ?? 4000;
const mongoConnectionString = process.env.DATABASE_CONNECTION_STRING;

if (!mongoConnectionString) {
  debug(chalk.red("Missing MongoDB connection string"));
  process.exit(1);
}

await connectToDatabase(mongoConnectionString);
startServer(Number(port));
