import { DeleteResult, getRepository } from "typeorm";
import { RefreshToken, User } from "../models";
import { ServerResponse, Authenticate } from "../interfaces";
import { UserRepository, AuthenticationRepository } from "../repositories";
import { StatusCode } from "../enums";
import { AuthenticationUtils } from "../utils";

interface IAuthenticationService {
  login: (
    username: string,
    password: string
  ) => Promise<ServerResponse<Authenticate>>;
  refreshToken: (refreshToken: string) => Promise<ServerResponse<Authenticate>>;
  logout: (refreshToken: string) => Promise<ServerResponse<DeleteResult>>;
}

export const AuthenticationService: IAuthenticationService = {
  login: async (
    username: string,
    password: string
  ): Promise<ServerResponse<Authenticate>> => {
    const user = await UserRepository.getUserByEmail(username);
    const pwd =
      user && AuthenticationUtils.comparePassword(password, user.password);

    if (!user || !pwd) {
      return {
        entity: null,
        error: { message: "Wrong username or password" },
        statusCode: StatusCode.BadRequest,
      };
    }

    const authentication = getAuthentication(user);

    return {
      entity: authentication,
      statusCode: StatusCode.Sucess,
    };
  },

  refreshToken: async (refreshToken: string) => {
    const refreshTokenFromDb = await getRepository(RefreshToken).findOne({
      where: {
        refreshToken,
      },
    });

    const isRefreshTokenExpired =
      refreshTokenFromDb &&
      new Date(refreshTokenFromDb.expireAt).getTime() < new Date().getTime();

    if (!refreshTokenFromDb || isRefreshTokenExpired) {
      return {
        entity: null,
        error: { message: "Invalid refresh-token" },
        statusCode: StatusCode.BadRequest,
      };
    }

    const user = await UserRepository.getById(refreshTokenFromDb.userId);
    if (!user) {
      return {
        entity: null,
        error: { message: "Could not refresh the token" },
        statusCode: StatusCode.ServerError,
      };
    }

    const authentication = getAuthentication(user);

    // Revoke the old refresh-token
    AuthenticationRepository.deleteToken(refreshToken);

    return {
      entity: authentication,
      statusCode: StatusCode.Sucess,
    };
  },

  logout: async (
    refreshToken: string
  ): Promise<ServerResponse<DeleteResult>> => {
    const deleted = await AuthenticationRepository.deleteToken(refreshToken);

    return {
      entity: null,
      statusCode: deleted.affected
        ? StatusCode.NoContent
        : StatusCode.ServerError,
    };
  },
};

const getAuthentication = (user: User): Authenticate => {
  const signUser = {
    ...user,
    password: null,
  };

  const authenticate: Authenticate = {
    accessToken: AuthenticationUtils.generateToken(
      signUser,
      "randomstringsalt",
      "1h"
    ),
    refreshToken: AuthenticationUtils.generateToken(
      signUser,
      "refrshsalst",
      "30d"
    ),
  };

  // Refresh token expire in 30 days.
  const expireAt = new Date(new Date().setDate(new Date().getDate() + 30));
  storeRefreshToken(authenticate.refreshToken, expireAt, user);

  return authenticate;
};

const storeRefreshToken = (
  refreshToken: string,
  expireAt: Date,
  user: User
): Promise<RefreshToken> => {
  return AuthenticationRepository.updateOrCreate({
    refreshToken,
    expireAt,
    user,
  } as RefreshToken);
};
