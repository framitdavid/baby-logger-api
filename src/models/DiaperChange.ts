import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class DiaperChange extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  disaperType: string;
  @Column()
  amount: string;
  @Column()
  comment: string;
  @Column()
  dateTime: Date;
  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.diaperChanges)
  user: User;
}
