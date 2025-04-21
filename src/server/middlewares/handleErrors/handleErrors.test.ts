import { Request, Response } from "express";
import ServerError from "../../ServerError/ServerError.js";
import handleErrors from "./handleErrors.js";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given the handleErrors middleware", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a response and a 404 'Endpoint not found' error", () => {
    const error = new ServerError(404, "Endpoint not found");

    test("Then it should call the response's method status with 404", () => {
      handleErrors(error, {} as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(error.statusCode);
    });

    test("Then it should call the response's method json with an 'Endpoint not found' error", () => {
      handleErrors(error, {} as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("When it receives a 'cannot read properties of undefined' error without status code", () => {
    const error = new Error("cannot read properties of undefined");

    test("Then it should call the response's method status with 500", () => {
      handleErrors(error as ServerError, {} as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(500);
    });

    test("Then it should call the response's method json with a 'General pete' error", () => {
      const expectedErrorMessage = "General pete";

      handleErrors(error as ServerError, {} as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ error: expectedErrorMessage });
    });
  });
});
