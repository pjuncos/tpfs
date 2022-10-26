import { Response, Request } from "express";
import { handleControllerError, ValidationError } from "../errors";
import { CustomRequest } from "../middlewares/request";
import * as LoginService from "../services/auth";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new ValidationError("Email and password are required");
    }

    const token = await LoginService.validateAndCreateToken(email, password);
    res.status(200).send(token);
  } catch (error) {
    handleControllerError(error, res, "Authentication failed");
  }
};

const userInfo = async (req: CustomRequest, res: Response) => {
  try {
    return res.status(200).send(req.user);
  } catch (error) {
    handleControllerError(error, res);
  }
};

export { login, userInfo };
