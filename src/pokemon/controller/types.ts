import { NextFunction, Request, Response } from "express";

export interface PokemonControllerStructure {
  getPokemons: (req: Request, res: Response) => Promise<void>;
  addPokemon: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}
