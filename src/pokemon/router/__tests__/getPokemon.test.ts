import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../../../server/app";
import { type PokemonStructure } from "../../types";
import connectToDatabase from "../../../database";
import mongoose from "mongoose";
import Pokemon from "../../model/Pokemon";
import pokemonDataMocks from "../../mocks/pokemonMocks";

beforeAll(async () => {
  await Pokemon.insertMany(pokemonDataMocks);
});

describe("Given a GET /pokemon endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with pokemon 'Bulbasaur', 'Charmander', 'Squirtel' and status code 200", async () => {
      const path = "/pokemon";
      const expectedStatusCode = 200;

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as {
        pokemon: PokemonStructure[];
      };

      responseBody.pokemon.forEach((singlePokemon, index) => {
        expect(singlePokemon.name === pokemonDataMocks[index].name);
      });
    });
  });
});
