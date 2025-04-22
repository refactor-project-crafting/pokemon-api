import { PokemonStructure } from "../types.js";

export type PokemonDataDto = Omit<PokemonStructure, "_id">;
