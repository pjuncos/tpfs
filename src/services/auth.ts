import * as crypto from "crypto";
import { sign } from "jsonwebtoken";
import User, { IUser } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret_key";

export const encodePassword = async function (
  password: string
): Promise<string> {
  return crypto.createHash("sha256").update(password).digest("hex");
};

const createToken = async function (user: IUser): Promise<string | undefined> {
  try {
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = sign(payload, TOKEN_SECRET);

    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const validateAndCreateToken = async function (
  email: string,
  password: string
): Promise<string | undefined> {
  const existUser = await User.findOne({ email: email });
  if (!existUser) {
    return Promise.reject(new Error("Login failed"));
  }
  const encoded = await encodePassword(password);
  if (encoded !== existUser.password) {
    return Promise.reject(new Error("Login failed"));
  }
  const token = await createToken(existUser);
  return Promise.resolve(token);
};
