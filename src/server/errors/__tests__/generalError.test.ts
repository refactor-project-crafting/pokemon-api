import type { Request, Response } from "express";
import { generalError } from "../errorMiddlewares";
import ServerError from "../ServerError/ServerError";

describe("Given the middleware generalError", () => {
  describe("When it receives an error 404 and a response", () => {
    test("Then it should call response's method status with 404", () => {
      const statusCode = 404;
      const error = new ServerError("", statusCode);
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});
