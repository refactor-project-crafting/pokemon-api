import { type NextFunction, type Request, type Response } from "express";

export interface PokemonControllerStructure {
  getPokemon: (req: Request, res: Response) => void;
  createPokemon: (req: Request, res: Response, next: NextFunction) => void;
}
