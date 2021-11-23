import { DeleteResult, getRepository } from "typeorm";
import { RefreshToken } from "../models";
import { FailedLoginAttempt } from "../models/FailedLoginAttempt";
import { IGenericRepository, GenericRepository } from "./GenericRepository";

interface IAuthenticationRepository extends IGenericRepository<RefreshToken> {
  deleteToken: (refreshToken: string) => Promise<DeleteResult>;
  getAllFailedLoginAttempts: (userId: number) => Promise<FailedLoginAttempt[]>
}

export const AuthenticationRepository: IAuthenticationRepository = {
  ...GenericRepository<RefreshToken>(RefreshToken),

  deleteToken: (refreshToken: string): Promise<DeleteResult> => {
    return getRepository(RefreshToken).delete({ refreshToken });
  },

  getAllFailedLoginAttempts: (userId: number): Promise<FailedLoginAttempt[]> => {
    return getRepository(FailedLoginAttempt).find({ where: { userId }})
  }
};
