import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  Default,
  DataType,
  Unique,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import {v4 as uuidv4} from 'uuid';

import { UserStore } from './UserStore';

@Table({paranoid: true})
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({primaryKey: true, type: DataType.UUID})
  id!: string;

  @Column
  firstname!: string;

  @Column
  lastName!: string;
  
  @Column
  userName!: string;

  @Column
  password!: string;

  @Column
  level!: number;

  @Column
  nextLevel!: number;

  @Column
  experience!: number;

  @Column
  job!: number;

  @Column
  war!: number;

  @Unique
  @Column 
  email!: string;

  @Column
  store!: number;

  @Column
  admin!: boolean;

  @Column
  ipAddress!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  beforeCreate() {
    this.id = uuidv4();
  }

  @ForeignKey(() => UserStore)
  @Column({ type: DataType.UUID })
  userStoreId!: string;
  
  @BelongsTo(() => UserStore)
  userStore!: UserStore;
  

}