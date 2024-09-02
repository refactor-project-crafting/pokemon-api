import chalk from "chalk";
import connectToDatabase from "./database/index.js";
import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 3000;
const mongoDbUrl = process.env.MONGODB_URL;

if (!mongoDbUrl) {
  console.log(chalk.red("Error: missing MongoDB URL"));
  process.exit(1);
}

try {
  await connectToDatabase(mongoDbUrl);

  startServer(Number(port));
} catch (error) {
  console.log(chalk.red("Error connecting to database:", error.message));
}
