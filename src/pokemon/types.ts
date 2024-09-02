import { type Request } from "express";

export interface PokemonData {
  name: string;
  type: string;
  gender: "F" | "M";
  skills: string[];
}

export interface PokemonStructure extends PokemonData {
  _id: string;
  isShiny: boolean;
}

export type PokemonDataRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  PokemonData
>;
