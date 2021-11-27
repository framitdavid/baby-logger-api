import { getRepository } from "typeorm";
import { GenericRepository, IGenericRepository } from "./GenericRepository";
import { User } from "../models";

interface IUserRepository extends IGenericRepository<User> {
  getUserByEmail: (email: string) => Promise<User | undefined>;
  blockAccount: () => Promise<void>;
}

export const UserRepository: IUserRepository = {
  ...GenericRepository(User),

  getUserByEmail: async (email: string): Promise<User | undefined> => {
    return await getRepository<User>(User).findOne({ where: { email } });
  },

  blockAccount: async (): Promise<void> => {
    
  } 
};
