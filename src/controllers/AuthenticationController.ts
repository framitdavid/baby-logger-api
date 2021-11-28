import { Request, Response } from "express";
import { RefreshTokenDTO, SignUpInputDTO, LoginInputDTO } from "../dtos";
import { UserService, AuthenticationService } from "../services";
import { ControllerUtils } from "../utils";
import { StatusCode } from "../enums";

interface IAuthenticationController {
  signup: (
    req: Request<{}, {}, SignUpInputDTO>,
    res: Response
  ) => Promise<void>;

  authenticate: (
    req: Request<{}, {}, LoginInputDTO>,
    res: Response
  ) => Promise<void>;

  token: (
    req: Request<{}, {}, RefreshTokenDTO>,
    res: Response
  ) => Promise<void>;

  logout: (
    req: Request<{}, {}, RefreshTokenDTO>,
    res: Response
  ) => Promise<void>;
}

export const AuthenticationController: IAuthenticationController = {
  signup: async (
    req: Request<{}, {}, SignUpInputDTO>,
    res: Response
  ): Promise<void> => {
    const { firstName, lastName, email, password } = req.body;

    const { statusCode, value } = ControllerUtils.response(
      await UserService.signup({ firstName, lastName, email, password })
    );

    res.status(statusCode).send(value);
  },

  authenticate: async (
    req: Request<{}, {}, LoginInputDTO>,
    res: Response
  ): Promise<void> => {
    const { username, password } = req.body;
    const result = ControllerUtils.response(
      await AuthenticationService.login(username, password)
    );

    res.status(result.statusCode).send(result.value);
  },

  token: async (
    req: Request<{}, {}, RefreshTokenDTO>,
    res: Response
  ): Promise<void> => {
    const { token } = req.body;

    const result = ControllerUtils.response(
      await AuthenticationService.refreshToken(token)
    );

    res.status(result.statusCode).send(result.value);
  },

  logout: async (
    req: Request<{}, {}, RefreshTokenDTO>,
    res: Response
  ): Promise<void> => {
    const user = ControllerUtils.getCurrentUser(req);
    if (user) {
      await AuthenticationService.logout(req.body.token);
      res.sendStatus(StatusCode.Success);
      return;
    }

    res.sendStatus(StatusCode.ServerError);
    return;
  },
};
