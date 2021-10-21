import { DeleteResult } from "typeorm";
import { Breastfeeding } from "../models";
import { BreastfeedingRepository } from "../repositories";

interface IBreastFeedingService {
  get: (userId: number) => Promise<Breastfeeding[]>;
  getById: (id: number) => Promise<Breastfeeding | undefined>;
  updateOrCreate: (breastfeeding: Breastfeeding) => Promise<Breastfeeding>;
  delete: (id: number) => Promise<DeleteResult>;
}

export const BreastFeedingService: IBreastFeedingService = {
  get: (userId: number): Promise<Breastfeeding[]> => {
    return BreastfeedingRepository.getAll(userId);
  },

  getById: async (id: number): Promise<Breastfeeding | undefined> => {
    return BreastfeedingRepository.getById(id);
  },

  updateOrCreate: async (
    breastfeeding: Breastfeeding
  ): Promise<Breastfeeding> => {
    return BreastfeedingRepository.updateOrCreate(breastfeeding);
  },

  delete: async (id: number): Promise<DeleteResult> => {
    return BreastfeedingRepository.delete(id);
  },
};
