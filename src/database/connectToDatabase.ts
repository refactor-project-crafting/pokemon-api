import mongoose from "mongoose";
import createDebug from "debug";
import chalk from "chalk";

const debug = createDebug("pokemon:database:connect");

const connectToDatabase = async (connectionString: string): Promise<void> => {
  try {
    await mongoose.connect(connectionString);
    mongoose.set("debug", true);

    debug(chalk.blue("Connected to database"));
  } catch (error) {
    debug(chalk.red("Error connecting to database: ", error.message));

    process.exit(1);
  }
};

export default connectToDatabase;
