import { Response, Request } from "express";
import { handleControllerError } from "../errors";
import * as LoginService from "../services/auth";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }
  try {
    const token = await LoginService.validateAndCreateToken(email, password);
    res.status(200).send(token);
  } catch (error) {
    handleControllerError(error, res, "Authentication failed");
  }
};

export { login };
