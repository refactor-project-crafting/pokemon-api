import { type Response, type Request } from "express";
import PokemonController from "../PokemonController";
import { type PokemonStructure } from "../../../types";
import Pokemon from "../../../model/Pokemon";
import { type Model } from "mongoose";
import pokemonDataMocks from "../../../mocks/pokemonMocks";

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

    const pokemon: PokemonStructure[] = [
      {
        _id: "1",
        name: "Pokeluis",
        gender: "M",
        type: "Test",
        isShiny: false,
        skills: [],
      },
      {
        _id: "2",
        name: "Pokemarta",
        gender: "F",
        type: "Test",
        isShiny: false,
        skills: [],
      },
    ];

    const pokemonModel: Partial<Model<PokemonStructure>> = {
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(pokemonDataMocks),
      }),
    };

    const pokemonController = new PokemonController(
      pokemon,
      pokemonModel as Model<PokemonStructure>
    );

    test("Then it should call the response's method status with 200", async () => {
      await pokemonController.getPokemon(req as Request, res as Response);

      expect(res.status).toHaveBeenCalled();
    });

    test("Then it should call the response's method json with the pokemon Pokeluis and Pokemarta", async () => {
      await pokemonController.getPokemon(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ pokemon: pokemonDataMocks });
    });
  });
});
