export interface PokemonStructure {
  _id: string;
  name: string;
  weight: number;
  height: number;
  bigImageUrl: string;
  smallImageUrl: string;
  isCaptured: boolean;
}

export type GetPokemonResponseBody = { pokemons: PokemonStructure[] };
