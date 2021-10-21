import { Breastfeeding } from "../models";
import {
  GenericRepository,
  IGenericRepository,
} from "./GenericRepository";

interface IBreastFeedingRepository extends IGenericRepository<Breastfeeding> {}

export const BreastfeedingRepository: IBreastFeedingRepository = {
  ...GenericRepository<Breastfeeding>(Breastfeeding),
};
