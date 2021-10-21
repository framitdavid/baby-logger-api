import { NextFunction, Request, Response } from "express";
import { RefreshTokenDTO } from "../../dtos";
import { StatusCode } from "../../enums";
import { ValidationUtils } from "../../utils";

export const validateRefreshTokenDTO = (
  req: Request<{}, {}, RefreshTokenDTO>,
  res: Response,
  next: NextFunction
) => {
  const modelState = ValidationUtils.createModelState([
    { ...ValidationUtils.validate(req.body.token), key: "token" },
  ]);

  if (!modelState.isValid) {
    res.status(StatusCode.BadRequest).send(modelState);
    return;
  }
  next();
};
