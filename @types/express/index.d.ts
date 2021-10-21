import { JwtPayload } from "jsonwebtoken";
import { User } from "../../src/models/User";

declare global {
  namespace Express {
    interface Request {
      jwtPayload: JwtPayload | undefined;
    }
  }
}
