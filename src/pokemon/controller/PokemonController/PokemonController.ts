import { type Request, type Response } from "express";
import { type PokemonControllerStructure } from "./types";
import { type Pokemon } from "../../types";

class PokemonController implements PokemonControllerStructure {
  constructor(private readonly pokemon: Pokemon[]) {}

  getPokemon(_req: Request, res: Response): void {
    res.status(200);
    res.json({ pokemon: this.pokemon });
  }
}

export default PokemonController;
