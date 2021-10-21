import { Request, Response, NextFunction } from "express";
import { SignUpInputDTO } from "../../dtos";
import { StatusCode } from "../../enums";
import { ValidationUtils } from "../../utils";

export const validateSignUpDTO = (
  req: Request<{}, {}, SignUpInputDTO>,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = req.body;

  const modelState = ValidationUtils.createModelState([
    { ...ValidationUtils.validate(firstName), key: "firstName" },
    { ...ValidationUtils.validate(lastName), key: "lastName" },
    { ...ValidationUtils.validate(email, { isEmail: true }), key: "email" },
    {
      ...ValidationUtils.validate(password, { minLength: 6 }),
      key: "password",
    },
  ]);

  if (!modelState.isValid) {
    res.status(StatusCode.BadRequest).send(modelState);
    return;
  }
  next();
};
