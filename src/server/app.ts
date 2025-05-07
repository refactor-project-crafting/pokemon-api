import express from "express";
import morgan from "morgan";
import cors from "cors";
import handleErrors from "./middlewares/handleErrors/handleErrors.js";
import handleEndpointNotFound from "./middlewares/handleEndpointNotFound/handleEndpointNotFound.js";
import pokemonsRouter from "../pokemon/router/pokemonsRouter.js";

const app = express();

app.use(
  cors({
    origin(requestOrigin, callback) {
      if (!requestOrigin) {
        callback(null, true);
        return;
      }

      const allowedOriginPatterns = process.env.ALLOWED_ORIGIN_PATTERNS;

      if (!allowedOriginPatterns) {
        callback(new Error("There aren't allowed origins"));
        return;
      }

      const originMatches = allowedOriginPatterns.split(",").some((pattern) => {
        return new RegExp(pattern).test(requestOrigin);
      });

      if (!requestOrigin || originMatches) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed"));
    },
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/pokemon", pokemonsRouter);

app.use(handleEndpointNotFound);
app.use(handleErrors);

export default app;
