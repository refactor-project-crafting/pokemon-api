import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import app from "../../../server/app.js";
import Pokemon from "../../model/Pokemon.js";
import { PokemonDataDto } from "../../dto/types.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbConnectionString = server.getUri();

  await connectToDatabase(mongoDbConnectionString);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a GET pokemon/aaaaaaaaaaaaaaaaaaaaaaaa endpoint for a non existing pokemon", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 404 status code and a 'Pokemon not found' error", async () => {
      const togepi: PokemonDataDto = {
        name: "Togepi",
        height: 20,
        weight: 10,
        bigImageUrl: "togepi-big.webp",
        smallImageUrl: "togepi-small.webp",
        isCaptured: false,
      };

      const magikarp: PokemonDataDto = {
        name: "Magikarp",
        height: 10,
        weight: 5,
        bigImageUrl: "magikarp-big.webp",
        smallImageUrl: "magikarp-small.webp",
        isCaptured: false,
      };

      await Pokemon.create(togepi, magikarp);

      const response = await request(app).get(
        "/pokemon/aaaaaaaaaaaaaaaaaaaaaaaa"
      );

      const body = response.body as {
        error: string;
      };

      expect(response.status).toBe(404);
      expect(body.error).toBe("Pokémon not found");
    });
  });
});
