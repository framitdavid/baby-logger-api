import express from "express";
import { BreastFeedingController } from "@controllers/BreastfeedingController";
import {
  AuthenticateToken,
  validateBrestfeedingInputDTO,
  validateDeleteDTO,
} from "../middlewares";

const BreastfeedingRoutes = express.Router();

BreastfeedingRoutes.get("/", [AuthenticateToken], BreastFeedingController.get);
BreastfeedingRoutes.post(
  "/",
  [AuthenticateToken, validateBrestfeedingInputDTO],
  BreastFeedingController.post
);
BreastfeedingRoutes.patch(
  "/",
  [AuthenticateToken, validateBrestfeedingInputDTO],
  BreastFeedingController.patch
);
BreastfeedingRoutes.delete(
  "/:id",
  [AuthenticateToken, validateDeleteDTO],
  BreastFeedingController.delete
);

export default BreastfeedingRoutes;
