import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "./database";
import mongoose from "mongoose";

let mongoDbServer: MongoMemoryServer;

beforeAll(async () => {
  mongoDbServer = await MongoMemoryServer.create();

  await connectToDatabase(mongoDbServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();

  await mongoDbServer.stop();
});
