import { Router } from "express";
import PokemonController from "../controller/PokemonController.js";
import Pokemon from "../model/Pokemon.js";

const pokemonsRouter = Router();

const pokemonController = new PokemonController(Pokemon);

pokemonsRouter.get("/", pokemonController.getPokemons);

export default pokemonsRouter;
