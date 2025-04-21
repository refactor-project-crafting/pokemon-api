import createDebug from "debug";
import { NextFunction, Request, Response } from "express";
import ServerError from "../../ServerError/ServerError.js";
import chalk from "chalk";

const debug = createDebug("pokemon:server:errors");

const handleErrors = (
  error: ServerError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  debug(chalk.red("Error: ", error.message));

  const statusCode = error.statusCode ?? 500;
  const message = error instanceof ServerError ? error.message : "General pete";

  res.status(statusCode).json({
    error: message,
  });
};

export default handleErrors;
