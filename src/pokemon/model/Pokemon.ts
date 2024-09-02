import { model, Schema } from "mongoose";
import { type PokemonStructure } from "../types";

const pokemonSchema = new Schema<PokemonStructure>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["F", "M"],
    required: true,
  },
  isShiny: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
});

const Pokemon = model("Pokemon", pokemonSchema, "pokemon");

export default Pokemon;
