import { verify } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret_key";

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Authorization token is missing" });
  }

  try {
    verify(token, TOKEN_SECRET);
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized access");
  }
};

export { verifyAuth };
