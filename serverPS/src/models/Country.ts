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

  // @Column(DataType.)
  // !:
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
