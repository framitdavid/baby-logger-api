import { FailedLoginAttempt } from "../models/FailedLoginAttempt";
import { GenericRepository, IGenericRepository } from "./GenericRepository";

interface IFailedLoginAttemptsRepository
  extends IGenericRepository<FailedLoginAttempt> {}

export const FailedLoginAttemptsRepository: IFailedLoginAttemptsRepository = {
  ...GenericRepository<FailedLoginAttempt>(FailedLoginAttempt),
};
