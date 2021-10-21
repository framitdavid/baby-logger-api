import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ValidationUtils } from "../utils";
import { ModelState } from "../utils/ValidationUtils";
import { User } from "./User";

@Entity({ name: "refreshTokens" })
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  refreshToken: string;
  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;
  @Column()
  expireAt: Date;
}

export interface RefreshTokenDTO {
  token: string;
}
