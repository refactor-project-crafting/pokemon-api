import { type Response, type Request } from "express";
import {
  type PokemonData,
  type Pokemon,
  type PokemonDataRequest,
} from "../../../types";
import PokemonController from "../PokemonController";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a method createController of the PokemonController class", () => {
  const pokemon: Pokemon[] = [
    {
      id: "a",
      name: "Luisius",
      gender: "M",
      skills: [],
      isShiny: false,
      type: "",
    },
    {
      id: "b",
      name: "Martius",
      gender: "F",
      skills: [],
      isShiny: false,
      type: "",
    },
  ];
  const pokemonController = new PokemonController(pokemon);

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a response and a non-existent pokemon named Guillermius", () => {
    test("Then it should call the response's method status with 201", () => {
      const expectedStatusCode = 201;

      const guillermius: PokemonData = {
        name: "Guillermius",
        gender: "M",
        skills: [],
        type: "",
      };

      const req: Partial<PokemonDataRequest> = {
        body: guillermius,
      };

      pokemonController.createPokemon(
        req as PokemonDataRequest,
        res as Response,
        jest.fn()
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a response and an existent pokemon named Martius", () => {
    test("Then it should call the response's method status with 409", () => {
      const expectedStatusCode = 409;

      const martius: PokemonData = {
        name: "Martius",
        gender: "F",
        skills: [],
        type: "",
      };

      const req: Partial<PokemonDataRequest> = {
        body: martius,
      };

      pokemonController.createPokemon(
        req as PokemonDataRequest,
        res as Response,
        jest.fn()
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
