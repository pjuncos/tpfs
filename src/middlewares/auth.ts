import { verify } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import dotenv from "dotenv";
import { CustomRequest } from "./request";
import User from "../models/user";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret_key";

const verifyAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const payload = verify(token, TOKEN_SECRET);
    req.user = new User(payload);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export { verifyAuth };
