import { Request, Response } from "express";
import { Model } from "mongoose";
import { PokemonControllerStructure } from "./types.js";
import { PokemonStructure } from "../types.js";

class PokemonController implements PokemonControllerStructure {
  constructor(private pokemonModel: Model<PokemonStructure>) {
    this.getPokemons = this.getPokemons.bind(this);
  }

  public async getPokemons(_req: Request, res: Response): Promise<void> {
    const pokemons = await this.pokemonModel.find().exec();

    res.status(200).json({ pokemons });
  }
}

export default PokemonController;
