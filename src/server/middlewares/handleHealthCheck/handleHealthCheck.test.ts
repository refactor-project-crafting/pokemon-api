import { Request, Response } from "express";
import handleHealthCheck from "./handleHealthCheck.js";

describe("Given the handleHealthCheck middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call the response's method status with 200", () => {
      const expectedStatusCode = 200;
      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      handleHealthCheck({} as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
