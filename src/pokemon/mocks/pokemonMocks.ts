import { type PokemonStructure } from "../types";

const pokemonDataMocks: Array<Omit<PokemonStructure, "_id">> = [
  {
    name: "Bulbasaur",
    gender: "M",
    type: "plant",
    isShiny: true,
    skills: ["latig", "cep"],
  },
  {
    name: "Charmander",
    gender: "M",
    type: "fire",
    isShiny: true,
    skills: ["flame", "scratch"],
  },
  {
    name: "Squirtel",
    gender: "M",
    type: "water",
    isShiny: false,
    skills: ["watergun", "climb"],
  },
];

export default pokemonDataMocks;
