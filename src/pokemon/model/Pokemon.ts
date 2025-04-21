import { model, Schema } from "mongoose";
import { PokemonStructure } from "../types.js";

const pokemonSchema = new Schema<PokemonStructure>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  height: {
    type: Number,
    default: 2,
  },
  weight: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isCaptured: {
    type: Boolean,
    default: false,
  },
});

const Pokemon = model("Pokemon", pokemonSchema, "pokemon");

export default Pokemon;
