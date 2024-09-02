import express from "express";
import PokemonController from "../controller/PokemonController/PokemonController.js";
import pokemon from "../pokemon.js";
import Pokemon from "../model/Pokemon.js";

const pokemonRouter = express.Router();
const pokemonController = new PokemonController(pokemon, Pokemon);

pokemonRouter.get("/", pokemonController.getPokemon);
pokemonRouter.post("/", pokemonController.createPokemon);

export default pokemonRouter;
