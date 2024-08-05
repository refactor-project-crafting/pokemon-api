import express from "express";
import pokemonRouter from "./pokemon/router/pokemonRouter.js";
import trainersRouter from "./trainer/router/trainersRouter.js";

const app = express();

app.use("/pokemon", pokemonRouter);
app.use("/trainers", trainersRouter);

export default app;
