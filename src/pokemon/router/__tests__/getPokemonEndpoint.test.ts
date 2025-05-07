import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import app from "../../../server/app.js";
import { GetPokemonResponseBody } from "../../types.js";
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

describe("Given the GET /pokemon endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status code and Togepi and Magikarp", async () => {
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

      const response = await request(app).get("/pokemon");

      const body = response.body as GetPokemonResponseBody;

      expect(response.status).toBe(200);
      expect(body.pokemons).toContainEqual(
        expect.objectContaining({ name: "Magikarp" })
      );
      expect(body.pokemons).toContainEqual(
        expect.objectContaining({ name: "Togepi" })
      );
      expect(body.pokemons).toHaveLength(2);
    });
  });
});
