import { verify } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import dotenv from "dotenv";
import { CustomRequest } from "./request";
import User, { ROLES } from "../models/user";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret_key";

const verifyAuth = (roles?: [ROLES]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    try {
      const payload = verify(token, TOKEN_SECRET);
      const user = new User(payload);

      if (roles && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

export { verifyAuth };
