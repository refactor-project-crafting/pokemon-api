import { type Response, type NextFunction } from "express";
import {
  type PokemonData,
  type PokemonStructure,
  type PokemonDataRequest,
} from "../../../types";
import PokemonController from "../PokemonController";
import Pokemon from "../../../model/Pokemon";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a method createController of the PokemonController class", () => {
  const pokemon: PokemonStructure[] = [
    {
      _id: "a",
      name: "Luisius",
      gender: "M",
      skills: [],
      isShiny: false,
      type: "",
    },
    {
      _id: "b",
      name: "Martius",
      gender: "F",
      skills: [],
      isShiny: false,
      type: "",
    },
  ];
  const pokemonController = new PokemonController(pokemon, Pokemon);

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
    test("Then it should call next function with a 409 'Pokemon already exists' error", () => {
      const expectedErrorStatusCode = 409;
      const expectedErrorMessage = "Pokemon already exists";

      const martius: PokemonData = {
        name: "Martius",
        gender: "F",
        skills: [],
        type: "",
      };

      const req: Partial<PokemonDataRequest> = {
        body: martius,
      };
      const next: NextFunction = jest.fn();

      pokemonController.createPokemon(
        req as PokemonDataRequest,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expectedErrorMessage,
          statusCode: expectedErrorStatusCode,
        })
      );
    });
  });
});
