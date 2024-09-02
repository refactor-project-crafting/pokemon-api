import { type Response, type Request } from "express";
import { notFoundError } from "../errorMiddlewares";

describe("Given a notFoundError middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the next function with a 404 'Endpoint not found' error", () => {
      const expectedErrorMessage = "Endpoint not found";
      const expectedErrorStatusCode = 404;

      const req = {};
      const res = {};
      const next = jest.fn();

      notFoundError(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expectedErrorMessage,
          statusCode: expectedErrorStatusCode,
        })
      );
    });
  });
});
