import { User } from "./models/User";

export interface USER {
  id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  level: number;
  nextLevel: number;
  experience: number;
  job: number;
  war: number;
  store: number;
  email: string;
  admin: boolean;
  ipAddress: string;
}

export interface USERS extends Partial<User> {}