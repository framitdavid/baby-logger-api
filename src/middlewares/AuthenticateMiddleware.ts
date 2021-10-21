import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { StatusCode } from "../enums";

export const AuthenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (accessToken === undefined) return res.sendStatus(StatusCode.Unauthorized);

  verify(accessToken, "randomstringsalt", (error, jwtPayload) => {
    if (error) return res.sendStatus(StatusCode.Unauthorized);
    req.jwtPayload = jwtPayload;
    next();
  });
};
