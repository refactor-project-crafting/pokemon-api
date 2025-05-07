import { Model } from "mongoose";
import { Response } from "express";
import PokemonController from "../PokemonController.js";
import { PokemonStructure } from "../../types.js";
import { RequestWithPokemonId } from "../types.js";
import ServerError from "../../../server/ServerError/ServerError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the deletePokemonById method of the Pokemon controller", () => {
  const next = jest.fn();

  describe("When it receives the non existent id 123456789012345678901234", () => {
    test("Then it should call the received next function with a 404 'Pokémon not found' error", async () => {
      const expectedError: Pick<ServerError, "message" | "statusCode"> = {
        message: "Pokémon not found",
        statusCode: 404,
      };

      const pokemonId = "123456789012345678901234";

      const mockedPokemonModel: Pick<
        Model<PokemonStructure>,
        "findByIdAndDelete"
      > = {
        findByIdAndDelete: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      };

      const pokemonController = new PokemonController(
        mockedPokemonModel as Model<PokemonStructure>
      );

      const req: Pick<RequestWithPokemonId, "params"> = {
        params: {
          pokemonId,
        },
      };

      await pokemonController.deletePokemonById(
        req as RequestWithPokemonId,
        {} as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });

  describe("When it receives the incorrect id 0000", () => {
    test("Then it should call the received next function with a 400 'Wrong id'", async () => {
      const mockedPokemonModel: Pick<
        Model<PokemonStructure>,
        "findByIdAndDelete"
      > = {
        findByIdAndDelete: jest.fn().mockReturnValue({
          exec: jest.fn(),
        }),
      };
      const pokemonController = new PokemonController(
        mockedPokemonModel as Model<PokemonStructure>
      );

      const req: Pick<RequestWithPokemonId, "params"> = {
        params: {
          pokemonId: "0000",
        },
      };

      const expectedError: Pick<ServerError, "statusCode" | "message"> = {
        statusCode: 400,
        message: "Wrong id",
      };

      await pokemonController.deletePokemonById(
        req as RequestWithPokemonId,
        {} as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });

  describe("When it receives the existent id 0123456789abcdef01234567", () => {
    const pikachu: PokemonStructure = {
      _id: "0123456789abcdef01234567",
      name: "Pikachu",
      height: 20,
      weight: 20,
      bigImageUrl: "pikachu.png",
      smallImageUrl: "pikachet.png",
      isCaptured: false,
    };

    const mockedPokemonModel: Pick<
      Model<PokemonStructure>,
      "findByIdAndDelete"
    > = {
      findByIdAndDelete: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(pikachu),
      }),
    };
    const pokemonController = new PokemonController(
      mockedPokemonModel as Model<PokemonStructure>
    );

    const req: Pick<RequestWithPokemonId, "params"> = {
      params: {
        pokemonId: "0123456789abcdef01234567",
      },
    };
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the received response's method status with 200", async () => {
      await pokemonController.deletePokemonById(
        req as RequestWithPokemonId,
        res as Response,
        next
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call the received response's method json with pikachu", async () => {
      await pokemonController.deletePokemonById(
        req as RequestWithPokemonId,
        res as Response,
        next
      );

      expect(res.json).toHaveBeenCalledWith({ pokemon: pikachu });
    });
  });
});
