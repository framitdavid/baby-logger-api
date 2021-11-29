import { DeleteResult, getRepository } from "typeorm";
import { RefreshToken, User } from "../models";
import { ServerResponse, Authenticate } from "../interfaces";
import {
  UserRepository,
  AuthenticationRepository,
  FailedLoginAttemptsRepository,
} from "../repositories";
import { StatusCode } from "../enums";
import { AuthenticationUtils } from "../utils";
import { FailedLoginAttempt } from "../models/FailedLoginAttempt";
import { DateUtils } from "../utils/DateUtils";

const wrongUsernameAndPasswordResponse: ServerResponse<Authenticate> = {
  entity: null,
  error: { message: "Wrong username or password" },
  statusCode: StatusCode.BadRequest,
};

const userAccountIsBlockedResponse: ServerResponse<Authenticate> = {
  entity: null,
  error: {
    message:
      "Your account is blocked 30 minutes from now. Please try to login again after 30 minutes.",
  },
  statusCode: StatusCode.Forbidden,
};

const invalidRefreshTokenResponse: ServerResponse<Authenticate> = {
  entity: null,
  error: { message: "Invalid refresh-token" },
  statusCode: StatusCode.BadRequest,
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

    if (isUserAccountBlocked(user)) {
      return userAccountIsBlockedResponse;
    }

    const isWrongPassword = !AuthenticationUtils.comparePassword(
      password,
      user.password
    );
    if (isWrongPassword) {
      await logFailedLoginAttempt(user.id);
      await blockUserAccountIfLoginAttemptsHasExceeded(user);
      return wrongUsernameAndPasswordResponse;
    }

    const authentication = getAuthentication(user);
    return {
      entity: authentication,
      statusCode: StatusCode.Success,
    };
  },

  refreshToken: async (
    refreshToken: string
  ): Promise<ServerResponse<Authenticate>> => {
    const refreshTokenFromDb = await getRepository(RefreshToken).findOne({
      where: {
        refreshToken,
      },
    });

    if (!refreshTokenFromDb) {
      return invalidRefreshTokenResponse;
    }

    const isRefreshTokenExpired =
      new Date(refreshTokenFromDb.expireAt).getTime() < new Date().getTime();

    if (isRefreshTokenExpired) {
      return invalidRefreshTokenResponse;
    }

    const user = await UserRepository.getById(refreshTokenFromDb.userId);

    if (!user) {
      return invalidRefreshTokenResponse;
    }

    const authentication = getAuthentication(user);

    // Revoke the old refresh-token
    AuthenticationRepository.deleteToken(refreshToken);

    return {
      entity: authentication,
      statusCode: StatusCode.Success,
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

const isUserAccountBlocked = (user: User): boolean => {
  const blockedUtil = new Date(user.blockedUtil).getTime();
  const dateTimeNow = new Date().getTime();

  const isAccountBlocked = dateTimeNow < blockedUtil;
  return isAccountBlocked;
};

const logFailedLoginAttempt = async (userId: number): Promise<void> => {
  await FailedLoginAttemptsRepository.updateOrCreate({
    userId,
    dateTime: new Date(),
  } as FailedLoginAttempt);
};

const blockUserAccountIfLoginAttemptsHasExceeded = async (
  user: User
): Promise<void> => {
  const dateTimeNow = new Date().valueOf();
  const MS_PER_MINUTE = 60000;
  const MINUTES_AGO = 5;
  const fiveMinutesAgo = new Date(dateTimeNow - MINUTES_AGO * MS_PER_MINUTE);

  try {
    const failedLoginAttempts =
      await AuthenticationRepository.getFailedLoginAttemptsSince(
        fiveMinutesAgo,
        user.id
      );

    const hasExceeded = failedLoginAttempts.length > 5;
    if (hasExceeded) {
      UserRepository.updateOrCreate({
        ...user,
        blockedUtil: DateUtils.addMinutes(new Date(), 30),
      } as User);
    }
  } catch (error) {
    console.log(error);
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
