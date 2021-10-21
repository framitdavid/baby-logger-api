import { User } from "./src/models/User";

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
