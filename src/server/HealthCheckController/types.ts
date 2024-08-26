import { type Request, type Response } from "express";

export interface HealthCheckControllerStructure {
  getPing: (req: Request, res: Response) => void;
}
