import { NextFunction, Request, Response } from "express";
import { BrestfeedingInputDTO } from "../../dtos/BrestfeedingDTO";
import { StatusCode } from "../../enums";
import { ValidationUtils } from "../../utils";

export const validateBrestfeedingInputDTO = (
  req: Request<{}, {}, BrestfeedingInputDTO>,
  res: Response,
  next: NextFunction
) => {
  const { duration, leftOrRight } = req.body;
  const modelState = ValidationUtils.createModelState([
    {
      ...ValidationUtils.validate(duration.toString(), {
        isRequired: true,
      }),
    },
    { ...ValidationUtils.validate(leftOrRight, { isRequired: true }) },
  ]);

  if (!modelState.isValid) {
    res.status(StatusCode.BadRequest).send(modelState);
    return;
  }
  next();
};
