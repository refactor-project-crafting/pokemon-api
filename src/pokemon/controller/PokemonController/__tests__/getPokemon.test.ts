import { type Response, type Request } from "express";
import PokemonController from "../PokemonController";
import { type Pokemon } from "../../../types";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the getPokemon method of the PokemonController class", () => {
  describe("When it receives a response", () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const pokemon: Pokemon[] = [
      {
        id: "1",
        name: "Pokeluis",
        gender: "M",
        type: "Test",
        isShiny: false,
        skills: [],
      },
      {
        id: "2",
        name: "Pokemarta",
        gender: "F",
        type: "Test",
        isShiny: false,
        skills: [],
      },
    ];

    const pokemonController = new PokemonController(pokemon);

    test("Then it should call the response's method status with 200", () => {
      pokemonController.getPokemon(req as Request, res as Response);

      expect(res.status).toHaveBeenCalled();
    });

    test("Then it should call the response's method json with the pokemon Pokeluis and Pokemarta", () => {
      pokemonController.getPokemon(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ pokemon });
    });
  });
});
