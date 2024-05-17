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

  @Column(DataType.STRING)
  firstName!: string;

  @Column(DataType.STRING)
  lastName!: string;
  
  @Unique
  @Column(DataType.STRING)
  userName!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.INTEGER)
  level!: number;

  @Column(DataType.INTEGER)
  nextLevel!: number;

  @Column(DataType.INTEGER)
  experience!: number;

  @Column(DataType.INTEGER)
  job!: number;

  @Column(DataType.INTEGER)
  war!: number;
  
  @Column(DataType.INTEGER)
  store!: number;

  @Unique
  @Column (DataType.STRING)
  email!: string;
  
  @Column(DataType.BOOLEAN)
  admin!: boolean;
  
  @Column (DataType.STRING)
  code!: string;

  @Column(DataType.BOOLEAN)
  verify!: boolean;

  @Column(DataType.STRING)
  ipAddress!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
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