import { NextFunction, Request, Response } from "express";
import { LoginInputDTO } from "../../dtos/LoginDTO";
import { StatusCode } from "../../enums";
import { ValidationUtils } from "../../utils/ValidationUtils";

export const validateLoginDTO = (
  req: Request<{}, {}, LoginInputDTO>,
  res: Response,
  next: NextFunction
): void => {
  const { username, password } = req.body;

  const modelState = ValidationUtils.createModelState([
    {
      ...ValidationUtils.validate(username),
      key: "username",
    },
    {
      ...ValidationUtils.validate(password, { minLength: 6 }),
      key: "password",
    },
  ]);

  if (!modelState.isValid) {
    res.status(StatusCode.BadRequest).send(modelState);
    return;
  } else {
    next();
  }
};
