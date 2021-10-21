import { DeleteResult, EntityTarget, getRepository } from "typeorm";

/*
 * Generic CRUD Repository to avoid dublication of CRUD methods
 * cross multiple entities.
 */

export interface IGenericRepository<T> {
  getAll: (userId: number) => Promise<T[]>;
  getById: (id: number) => Promise<T | undefined>;
  updateOrCreate: (entity: T) => Promise<T>;
  delete: (id: number) => Promise<DeleteResult>;
}

export const GenericRepository = <T>(
  repo: EntityTarget<T>
): IGenericRepository<T> => ({
  getAll: async (userId: number): Promise<T[]> => {
    return await getRepository<T>(repo).find({ where: { userId } });
  },

  getById: async (id: number): Promise<T | undefined> => {
    return await getRepository<T>(repo).findOne({ where: { id } });
  },

  updateOrCreate: async (entity: T) => {
    return getRepository<T>(repo).save(entity);
  },

  delete: async (id: number): Promise<DeleteResult> => {
    return getRepository<T>(repo).delete(id);
  },
});
