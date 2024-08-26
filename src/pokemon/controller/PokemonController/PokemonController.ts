import crypto from "node:crypto";
import { type NextFunction, type Request, type Response } from "express";
import { type PokemonControllerStructure } from "./types";
import { type Pokemon, type PokemonDataRequest } from "../../types";
import ServerError from "../../../server/errors/ServerError/ServerError.js";

class PokemonController implements PokemonControllerStructure {
  constructor(private readonly pokemon: Pokemon[]) {}

  getPokemon = (_req: Request, res: Response): void => {
    res.status(200).json({ pokemon: this.pokemon });
  };

  createPokemon = (
    req: PokemonDataRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const pokemonData = req.body;

    const existingPokemon = this.pokemon.find(
      (pokemon) => pokemonData.name === pokemon.name
    );

    if (existingPokemon) {
      const error = new ServerError("Pokemon already exists", 409);

      next(error);
      return;
    }

    const newPokemon: Pokemon = {
      id: crypto.randomUUID(),
      isShiny: false,
      ...pokemonData,
    };

    this.pokemon.push(newPokemon);

    res.status(201).json({ newPokemon });
  };
}

export default PokemonController;
