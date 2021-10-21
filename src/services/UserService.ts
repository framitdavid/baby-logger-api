import { getRepository } from "typeorm";
import { SignUpInputDTO } from "../dtos";
import { User } from "../models";
import { StatusCode } from "../enums";
import { AuthenticationUtils } from "../utils";
import { ServerResponse } from "../interfaces";
import { UserRepository } from "../repositories";

interface IUserService {
  signup: (signup: SignUpInputDTO) => Promise<ServerResponse<User>>;
}

export const UserService: IUserService = {
  signup: async (signup: SignUpInputDTO): Promise<ServerResponse<User>> => {
    const alreadyExist = await UserRepository.getUserByEmail(signup.email);

    if (alreadyExist) {
      return {
        entity: null,
        error: { message: "Email already exist" },
        statusCode: StatusCode.Conflict,
      };
    }

    const newUser = {
      ...signup,
      password: AuthenticationUtils.hashPassword(signup.password),
    } as User;

    return {
      entity: await getRepository(User).save(newUser),
      statusCode: StatusCode.Sucess,
    };
  },
};
