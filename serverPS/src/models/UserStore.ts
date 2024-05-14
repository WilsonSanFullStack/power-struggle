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

  @Column(DataType.INTEGER)
  gold!: number;

  @Column(DataType.INTEGER)
  copper!: number;

  @Column(DataType.INTEGER)
  carbon!: number;

  @Column(DataType.INTEGER)
  emerald!: number;

  @Column(DataType.INTEGER)
  iron!: number;

  @Column(DataType.INTEGER)
  nickel!: number;

  @Column(DataType.INTEGER)
  silver!: number;

  @Column(DataType.INTEGER)
  platinum!: number;

  @Column(DataType.INTEGER)
  army!: number;

  @Column(DataType.INTEGER)
  armada!: number;

  @Column(DataType.INTEGER)
  airForce!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
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
