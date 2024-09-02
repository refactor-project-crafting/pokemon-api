import { type Request, type Response } from "express";
import HealthCheckController from "../HealthCheckController";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the method getPing of the HealthCheckController class", () => {
  describe("When it receives a response", () => {
    const healthCheckController = new HealthCheckController();

    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    test("Then it should call the response's method status with 200", () => {
      const expectedStatusCode = 200;

      healthCheckController.getPing(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with a 'pong' message", () => {
      healthCheckController.getPing(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ pong: true });
    });
  });
});
