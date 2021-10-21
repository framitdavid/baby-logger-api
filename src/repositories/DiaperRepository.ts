import { DiaperChange } from "../models";
import { GenericRepository, IGenericRepository } from "./GenericRepository";

interface IDiaperRepository extends IGenericRepository<DiaperChange> {}

export const DiaperRepository: IDiaperRepository = {
  ...GenericRepository(DiaperChange),
};
