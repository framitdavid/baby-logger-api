import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticationUtils {
  hashPassword: (password: string) => string;
  comparePassword: (password: string, hashedPassword: string) => boolean;
  generateToken: (
    object: string | object | Buffer,
    salt: string,
    expiresIn: "1h" | "30d"
  ) => string;
}

export const AuthenticationUtils: IAuthenticationUtils = {
  hashPassword: (password: string): string => {
    return bcrypt.hashSync(password, 10);
  },

  comparePassword: (password: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(password, hashedPassword);
  },

  generateToken: (
    object: string | object | Buffer,
    salt: string,
    expiresIn: "1h" | "30d"
  ): string => {
    return sign(object, salt, { expiresIn });
  },
};
