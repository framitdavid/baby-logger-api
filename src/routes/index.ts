import express from "express";
import AuthenticationRoutes from "./AuthenticateRoutes";
import BreastfeedingRoutes from "./BreastfeedingRoutes";
import DiaperChangeRoutes from "./DiaperChangeRoutes";

const routes = express.Router();

routes.use("/authenticate", AuthenticationRoutes);
routes.use("/breastfeeding", BreastfeedingRoutes);
routes.use("/diaperChange", DiaperChangeRoutes);

export default routes;
