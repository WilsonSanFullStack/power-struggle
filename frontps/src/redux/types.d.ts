import { actionTypes } from "./action";
import { Action } from "redux";

export interface User {
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
export type PostUser = string

export interface actionPostUser extends Action {
  type: typeof actionTypes.postUser;
  payload: PostUser;
}
export interface initState {
  postUser: null | string;
}

export interface StoreState {
  user: typeof PostUser
}