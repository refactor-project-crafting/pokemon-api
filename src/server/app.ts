import express from "express";
import cors from "cors";
import morgan from "morgan";
import pokemonRouter from "../pokemon/router/pokemonRouter.js";
import trainersRouter from "../trainer/router/trainersRouter.js";
import HealthCheckController from "./HealthCheckController/HealthCheckController.js";
import { generalError, notFoundError } from "./errors/errorMiddlewares.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://render.com/blabla",
    ],
  })
);

const healthCheckController = new HealthCheckController();

app.get("/", healthCheckController.getPing);
app.use("/pokemon", pokemonRouter);
app.use("/trainers", trainersRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
