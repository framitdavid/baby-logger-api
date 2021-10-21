import { StatusCode } from "../enums";

export interface ServerResponse<T> {
  entity: T | null;
  statusCode: StatusCode;
  error?: { message: string };
}
