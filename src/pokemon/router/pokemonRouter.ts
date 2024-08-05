import express from "express";
import pokemon from "../pokemon.js";

const pokemonRouter = express.Router();

pokemonRouter.get("/", (_req, res) => {
  res.json({ pokemon });
});

pokemonRouter.post(
  "/",
  (req, _res, next) => {
    console.log(
      `Ha llegado una request con método ${req.method} a la URL ${req.url}`
    );

    next();
  },
  (_req, res) => {
    console.log("Se ha pedido crear un pokemon");

    res.status(201).json({ newPokemon: "Pikachu" });
  }
);

pokemonRouter.delete("/:pokemonId", (_req, res) => {
  res.json({ deleted: true });
});

export default pokemonRouter;
