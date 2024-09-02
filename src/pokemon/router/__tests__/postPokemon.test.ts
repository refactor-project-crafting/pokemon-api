import request from "supertest";
import app from "../../../server/app";
import { type PokemonStructure, type PokemonData } from "../../types";
import pokemon from "../../pokemon";

describe("Given a POST /pokemon endpoint", () => {
  describe("When it receives a request with the existing 'Bulbasaur' pokemon", () => {
    test("Then it should respond with a 409 'Pokemon already exists' error", async () => {
      const expectedErrorMessage = "Pokemon already exists";
      const expectedStatusCode = 409;

      const bulbasaur: PokemonData = pokemon.find(
        (singlePokemon) => singlePokemon.name === "Bulbasaur"
      )!;

      const response = await request(app)
        .post("/pokemon")
        .send(bulbasaur)
        .expect(expectedStatusCode);

      const responseBody = response.body as {
        error: string;
      };

      expect(responseBody).toHaveProperty("error", expectedErrorMessage);
    });
  });

  describe("When it receives a request with a non-existing 'Pikachu' pokemon", () => {
    test("Then it should respond with the created pokemon Pikachu and 201 status code", async () => {
      const pikachu: PokemonData = {
        name: "Pikachu",
        gender: "M",
        skills: [],
        type: "electric",
      };

      const response = await request(app)
        .post("/pokemon")
        .send(pikachu)
        .expect(201);

      const responseBody = response.body as {
        newPokemon: PokemonStructure;
      };

      expect(responseBody.newPokemon).toHaveProperty("name", pikachu.name);
    });
  });
});
