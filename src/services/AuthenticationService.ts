import { DeleteResult, getRepository } from "typeorm";
import { RefreshToken, User } from "../models";
import { ServerResponse, Authenticate } from "../interfaces";
import { UserRepository, AuthenticationRepository } from "../repositories";
import { StatusCode } from "../enums";
import { AuthenticationUtils } from "../utils";

const wrongUsernameAndPasswordResponse: ServerResponse<Authenticate> = {
  entity: null,
  error: { message: "Wrong username or password" },
  statusCode: StatusCode.BadRequest,
};

const exceededLoginAttemptsResponse: ServerResponse<Authenticate> = {
  entity: null,
  error: {
    message:
      "You have excceded the maximum login attempts, your account is blocked 30 minutes from now.",
  },
  statusCode: StatusCode.Forbidden,
};

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

    if (!user) {
      return wrongUsernameAndPasswordResponse;
    }

    if (await isUserAccountBlocked(user)) {
      return exceededLoginAttemptsResponse;
    }

    const isWrongPassword =
      user && !AuthenticationUtils.comparePassword(password, user.password);

    if (isWrongPassword) {
      await logFailedLoginAttempt(user.id);
      return wrongUsernameAndPasswordResponse;
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

const isUserAccountBlocked = async (user: User): Promise<boolean> => {
  try {
    const now = new Date();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const logFailedLoginAttempt = async (userId: number): Promise<void> => {
  // TODO save the login attempt to the database.
};

const hasExceededAllowedLoginAttempts = async (
  userId: number
): Promise<boolean> => {
  const dateTimeNow = new Date().valueOf();
  const MS_PER_MINUTE = 60000;
  const MINUTES_AGO = 5;
  const fiveMinutesAgo = new Date(dateTimeNow - MINUTES_AGO * MS_PER_MINUTE);

  try {
    const failedLoginAttempts =
      await AuthenticationRepository.getFailedLoginAttemptsSince(
        fiveMinutesAgo,
        userId
      );

    if (!failedLoginAttempts) {
      return false;
    }

    const countedLoginAttempts = failedLoginAttempts.length;
    const hasExceeded = countedLoginAttempts > 5;
    return hasExceeded;
  } catch (error) {
    console.log(error);
    return false;
  }
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
