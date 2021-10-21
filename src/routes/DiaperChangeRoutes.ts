import express from "express";
import { DiaperChangeController } from "../controllers";
import { AuthenticateToken } from "../middlewares";

const DiaperChangeRoutes = express.Router();

DiaperChangeRoutes.get("/", AuthenticateToken, DiaperChangeController.get);
DiaperChangeRoutes.post("/", AuthenticateToken, DiaperChangeController.post);
DiaperChangeRoutes.patch("/", AuthenticateToken, DiaperChangeController.patch);
DiaperChangeRoutes.delete(
  "/:id",
  AuthenticateToken,
  DiaperChangeController.delete
);

export default DiaperChangeRoutes;
