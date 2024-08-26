import { type Response, type Request, type NextFunction } from "express";
import ServerError from "./ServerError/ServerError.js";

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new ServerError("Endpoint not found", 404);

  next(error);
};

export const generalError = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status((error as ServerError).statusCode).json({ error: error.message });
};
