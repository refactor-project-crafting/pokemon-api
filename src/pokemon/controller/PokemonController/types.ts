import { type Request, type Response } from "express";

export interface PokemonControllerStructure {
  getPokemon: (req: Request, res: Response) => void;
}
