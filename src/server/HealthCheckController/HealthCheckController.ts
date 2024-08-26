import { type Request, type Response } from "express";
import { type HealthCheckControllerStructure } from "./types";

class HealthCheckController implements HealthCheckControllerStructure {
  getPing(_req: Request, res: Response): void {
    res.status(200).json({ pong: true });
  }
}

export default HealthCheckController;
