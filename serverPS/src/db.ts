import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
export const sequelize = new Sequelize({
  dialect: "postgres",
  database: DB_NAME,
  password: DB_PASSWORD,
  username: DB_USER,
  storage: ":memory:",
  models: [__dirname + "/models"],
  logging: false
});
