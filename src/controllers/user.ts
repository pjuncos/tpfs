import { Response, Request } from "express";
import * as UserService from "../services/user";

const getAllUsers = async (req: Request, res: Response) => {
  const limit = parseInt(req.params.limit) | 100;
  const offset = parseInt(req.params.offset) | 0;
  try {
    const result = await UserService.getAllUsers(limit, offset);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send("Internal error");
  }
};

const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const result = await UserService.addUser(name, email, true, password);
    if (result) {
      return res.status(201).send("User successfully created"); // 201
    }
    res.status(409).send("User already exists"); // 409
  } catch (error) {
    res.status(500).send("Error creating user"); //500
  }
};

const editUser = async (req: Request, res: Response) => {
  const user = { _id: req.params.id, ...req.body };
  try {
    const result = await UserService.editUser(user);
    if (result) {
      return res.status(200).json(result);
    }
    res.status(404).send("User does not exist");
  } catch (error) {
    res.status(500).send("Internal error");
  }
};

export { getAllUsers, addUser, editUser };
