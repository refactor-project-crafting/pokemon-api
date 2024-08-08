import express from "express";
import PokemonController from "../controller/PokemonController/PokemonController.js";
import pokemon from "../pokemon.js";

const pokemonRouter = express.Router();
const pokemonController = new PokemonController(pokemon);

pokemonRouter.get("/", pokemonController.getPokemon);

export default pokemonRouter;
