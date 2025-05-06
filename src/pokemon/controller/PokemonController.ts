import { NextFunction, Request, Response } from "express";
import { isValidObjectId, Model } from "mongoose";
import { PokemonControllerStructure, RequestWithPokemonId } from "./types.js";
import { GetPokemonResponseBody, PokemonStructure } from "../types.js";
import { PokemonDataDto } from "../dto/types.js";
import ServerError from "../../server/ServerError/ServerError.js";
import Pokemon from "../model/Pokemon.js";

class PokemonController implements PokemonControllerStructure {
  constructor(private pokemonModel: Model<PokemonStructure>) {
    this.getPokemons = this.getPokemons.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
  }

  public async getPokemons(
    _req: Request<Record<string, unknown>, GetPokemonResponseBody>,
    res: Response
  ): Promise<void> {
    const pokemons = await this.pokemonModel.find().exec();

    res.status(200).json({ pokemons });
  }

  public async addPokemon(
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      PokemonDataDto
    >,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const pokemonData = req.body;

    const existentPokemon = await this.pokemonModel.findOne({
      name: new RegExp(pokemonData.name, "i"),
    });

    if (existentPokemon) {
      const error = new ServerError(409, "Pokémon already exists");

      next(error);
      return;
    }

    const pokemon = await this.pokemonModel.create(pokemonData);

    res.status(201).json({ newPokemon: pokemon });
  }

  public async getPokemonById(
    req: Request<{ pokemonId: string }>,
    res: Response,
    next: NextFunction
  ) {
    const { pokemonId } = req.params;

    const pokemon = await Pokemon.findById(pokemonId).exec();

    if (!pokemon) {
      const error = new ServerError(404, "Pokémon not found");

      next(error);
      return;
    }

    res.status(201).json({ pokemon });
  }

  public async deletePokemonById(
    req: RequestWithPokemonId,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { pokemonId } = req.params;

    if (!isValidObjectId(pokemonId)) {
      const error = new ServerError(400, "Wrong id");

      next(error);

      return;
    }

    const pokemon = await this.pokemonModel.findByIdAndDelete(pokemonId).exec();

    if (!pokemon) {
      const error = new ServerError(404, "Pokémon not found");

      next(error);

      return;
    }

    const pikachu: PokemonStructure = {
      _id: "0123456789abcdef01234567",
      name: "Pikachu",
      height: 20,
      weight: 20,
      bigImageUrl: "pikachu.png",
      smallImageUrl: "pikachet.png",
      isCaptured: false,
    };

    res.status(200).json({ pokemon: pikachu });
  }
}

export default PokemonController;
