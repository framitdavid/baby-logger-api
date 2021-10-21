import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../enums";
import { ValidationUtils } from "../../utils/ValidationUtils";

export const validateDeleteDTO = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  const modelState = ValidationUtils.createModelState([
    {
      ...ValidationUtils.validate(id, { isNumber: true }),
      key: "id",
    },
  ]);

  if (!modelState.isValid) {
    res.status(StatusCode.BadRequest).send(modelState);
    return;
  } else {
    next();
  }
};
