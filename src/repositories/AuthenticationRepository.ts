import { DeleteResult, getRepository } from "typeorm";
import { RefreshToken } from "../models";
import { IGenericRepository, GenericRepository } from "./GenericRepository";

interface IAuthenticationRepository extends IGenericRepository<RefreshToken> {
  deleteToken: (refreshToken: string) => Promise<DeleteResult>;
}

export const AuthenticationRepository: IAuthenticationRepository = {
  ...GenericRepository<RefreshToken>(RefreshToken),

  deleteToken: (refreshToken: string): Promise<DeleteResult> => {
    return getRepository(RefreshToken).delete({ refreshToken });
  },
};
