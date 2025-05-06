import { NextFunction, Request, Response } from "express";

export type RequestWithPokemonId = Request<{
  pokemonId: string;
}>;

export interface PokemonControllerStructure {
  getPokemons: (req: Request, res: Response) => Promise<void>;
  addPokemon: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  deletePokemonById: (
    req: RequestWithPokemonId,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}
