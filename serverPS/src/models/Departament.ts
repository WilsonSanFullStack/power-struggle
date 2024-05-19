import {
  PrimaryKey,
  Table,
  Model,
  Default,
  DataType,
  Column,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({ paranoid: true })
export class Country extends Model<Country> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUID })
  id!: string;

  @Column(DataType.STRING)
  name!: string

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
  
  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  beforeCreate() {
    this.id = uuidv4()
  }
}