import express from "express";

const trainersRouter = express.Router();

trainersRouter.get("/", (_req, res) => {
  res.json({ trainers: [] });
});

trainersRouter.post("/", (_req, res) => {
  res.status(201).json({ newTrainer: "Satoshi" });
});

trainersRouter.delete("/:trainerId", (_req, res) => {
  res.json({ deleted: true });
});

export default trainersRouter;
