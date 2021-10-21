import express from "express";
import { AuthenticationController } from "../controllers";
import {
  AuthenticateToken,
  validateSignUpDTO,
  validateLoginDTO,
  validateRefreshTokenDTO,
} from "../middlewares";

const AuthenticationRoutes = express.Router();

AuthenticationRoutes.post(
  "/signup",
  [validateSignUpDTO],
  AuthenticationController.signup
);

AuthenticationRoutes.post(
  "/",
  [validateLoginDTO],
  AuthenticationController.authenticate
);

AuthenticationRoutes.post(
  "/token",
  [validateRefreshTokenDTO],
  AuthenticationController.token
);

AuthenticationRoutes.post(
  "/logout",
  [AuthenticateToken, validateRefreshTokenDTO],
  AuthenticationController.logout
);

export default AuthenticationRoutes;
