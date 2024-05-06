import { v4 as uuidv4 } from "uuid";
import {
  Column,
  CreatedAt,
  DataType,
  Default,
  PrimaryKey,
  Table,
  UpdatedAt,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";

import { User } from "./User";

@Table({ paranoid: true })
export class UserStore extends Model<UserStore> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUID })
  id!: string;

  @Column
  gold!: number;

  @Column
  copper!: number;

  @Column
  carbon!: number;

  @Column
  emerald!: number;

  @Column
  iron!: number;

  @Column
  nickel!: number;

  @Column
  silver!: number;

  @Column
  platinum!: number;

  @Column
  army!: number;

  @Column
  armada!: number;

  @Column
  airForce!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  beforeCreate() {
    this.id = uuidv4();
  }

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId!: string;
  
  @BelongsTo(() => User)
  user!: User;
}
