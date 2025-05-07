import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { PokemonControllerStructure } from "./types.js";
import { PokemonStructure } from "../types.js";
import { PokemonDataDto } from "../dto/types.js";
import ServerError from "../../server/ServerError/ServerError.js";

class PokemonController implements PokemonControllerStructure {
  constructor(private readonly pokemonModel: Model<PokemonStructure>) {
    this.getPokemons = this.getPokemons.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
  }

  public async getPokemons(_req: Request, res: Response): Promise<void> {
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
}

export default PokemonController;
