import crypto from "node:crypto";
import { type Model } from "mongoose";
import { type NextFunction, type Request, type Response } from "express";
import { type PokemonControllerStructure } from "./types";
import { type PokemonStructure, type PokemonDataRequest } from "../../types";
import ServerError from "../../../server/errors/ServerError/ServerError.js";

class PokemonController implements PokemonControllerStructure {
  constructor(
    private readonly inMemoryPokemon: PokemonStructure[],
    private readonly pokemon: Model<PokemonStructure>
  ) {}

  getPokemon = async (_req: Request, res: Response): Promise<void> => {
    const pokemon = await this.pokemon.find().exec();

    res.status(200).json({ pokemon });
  };

  createPokemon = (
    req: PokemonDataRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const pokemonData = req.body;

    const existingPokemon = this.inMemoryPokemon.find(
      (pokemon) => pokemonData.name === pokemon.name
    );

    if (existingPokemon) {
      const error = new ServerError("Pokemon already exists", 409);

      next(error);
      return;
    }

    const newPokemon: PokemonStructure = {
      _id: crypto.randomUUID(),
      isShiny: false,
      ...pokemonData,
    };

    this.inMemoryPokemon.push(newPokemon);

    res.status(201).json({ newPokemon });
  };
}

export default PokemonController;
