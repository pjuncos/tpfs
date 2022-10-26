import { IUser } from "../models/user";
import { Request } from "express";

export interface CustomRequest extends Request {
  user?: IUser;
}
