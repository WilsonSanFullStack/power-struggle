import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routers/router";
const server: Application = express();
dotenv.config();
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

server.use(
  cors({
    origin: process.env.URL,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);

interface Err{
  status: number
  message: string
}

server.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).json(message);
});

server.use(router);
export default server;
