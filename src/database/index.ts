import mongoose from "mongoose";
import chalk from "chalk";

const connectToDatabase = async (mongoDbUrl: string): Promise<void> => {
  await mongoose.connect(mongoDbUrl);
  mongoose.set("debug", true);
  console.log(chalk.blue("Connected to database"));
};

export default connectToDatabase;
