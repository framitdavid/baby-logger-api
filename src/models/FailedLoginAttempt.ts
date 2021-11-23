import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { User } from "./User";
  
  @Entity()
  export class FailedLoginAttempt extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    dateTime: Date;
    @Column()
    userId: number;
    @ManyToOne(() => User, (user) => user.failedLoginAttempts)
    user: User;
  }
  