import { Response, Request } from "express";
import { AuthorizationError, handleControllerError } from "../errors";
import { CustomRequest } from "../middlewares/request";
import * as UserService from "../services/user";

const getAllUsers = async (req: CustomRequest, res: Response) => {
  const limit = parseInt(req.params.limit) | 100;
  const offset = parseInt(req.params.offset) | 0;
  try {
    const result = await UserService.getAllUsers(limit, offset);
    res.status(200).send(result);
  } catch (error) {
    handleControllerError(error, res, "Internal error");
  }
};

const addUser = async (req: CustomRequest, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    if (req.user && !req.user.isAdmin()) {
      throw new AuthorizationError();
    }
    const result = await UserService.addUser(name, email, true, password, role);
    res.status(201).send(result);
  } catch (error) {
    handleControllerError(error, res, "Error creating user");
  }
};

const editUser = async (req: Request, res: Response) => {
  const user = { _id: req.params.id, ...req.body };
  try {
    const result = await UserService.editUser(user);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(error, res, "Internal error");
  }
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await UserService.getUser(id);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(error, res, "Internal error");
  }
};

export { getAllUsers, addUser, editUser, getUser };
