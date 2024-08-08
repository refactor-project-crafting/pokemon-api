import { type Pokemon } from "./types";

const pokemon: Pokemon[] = [
  {
    id: "1",
    name: "Bulbasaur",
    gender: "M",
    type: "plant",
    isShiny: true,
    skills: ["latig", "cep"],
  },
  {
    id: "2",
    name: "Charmander",
    gender: "M",
    type: "fire",
    isShiny: true,
    skills: ["flame", "scratch"],
  },
  {
    id: "3",
    name: "Squirtel",
    gender: "M",
    type: "water",
    isShiny: false,
    skills: ["watergun", "climb"],
  },
];

export default pokemon;
