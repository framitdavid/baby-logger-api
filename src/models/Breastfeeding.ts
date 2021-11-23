import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Breastfeeding extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("decimal")
  duration: number;
  @Column()
  comment: string;
  @Column()
  leftOrRight: string;
  @Column()
  dateTime: Date;
  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.brestfeedings)
  user: User;
}
