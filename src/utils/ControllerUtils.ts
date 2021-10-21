import { Request } from "express";
import { User } from "../models";
import { StatusCode } from "../enums";
import { ServerResponse } from "../interfaces";

interface Result {
  statusCode: StatusCode;
  value: any;
}

interface IControllerUtils {
  response: <T>(serverResponse: ServerResponse<T>) => Result;
  getCurrentUser: (req: Request) => User;
  hasAccessToEntity: <T extends { userId: number }>(
    entity: T,
    userId: number
  ) => boolean;
}

export const ControllerUtils: IControllerUtils = {
  response: <T>(serverResponse: ServerResponse<T>): Result => {
    const errorCodes = [400, 401, 403, 404, 500];

    const isError = errorCodes.includes(serverResponse.statusCode);
    return {
      statusCode: serverResponse.statusCode,
      value: isError ? serverResponse.error : serverResponse.entity,
    };
  },

  getCurrentUser: (req: Request): User => {
    return req.jwtPayload as User;
  },

  hasAccessToEntity: <T extends { userId: number }>(
    entity: T,
    userId: number
  ): boolean => {
    return entity.userId === userId;
  },
};
