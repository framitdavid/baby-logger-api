import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Breastfeeding } from "./Breastfeeding";
import { DiaperChange } from "./DiaperChange";
import { FailedLoginAttempt } from "./FailedLoginAttempt";
import { RefreshToken } from "./RefreshToken";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Breastfeeding, (breastfeeding) => breastfeeding.user)
  brestfeedings: Breastfeeding[];
  @OneToMany(() => DiaperChange, (diaperChange) => diaperChange.user)
  diaperChanges: DiaperChange[];
  @OneToMany(
    () => FailedLoginAttempt,
    (failedLoginAttempt) => failedLoginAttempt.user
  )
  failedLoginAttempts: FailedLoginAttempt[];
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
