import { Response, Request } from "express";
import { handleControllerError } from "../errors";
import { CustomRequest } from "../middlewares/request";
import * as ClassService from "../services/class";

const getAllClasses = async (req: CustomRequest, res: Response) => {
  const limit = parseInt(req.params.limit) | 100;
  const offset = parseInt(req.params.offset) | 0;
  try {
    const result = await ClassService.getAllClasses(limit, offset);
    res.status(200).send(result);
  } catch (error) {
    handleControllerError(error, res, "Internal error");
  }
};

const addClass = async (req: CustomRequest, res: Response) => {
  const { name } = req.body;
  try {
    const result = await ClassService.addClass(name, req.user?._id, true);
    return res.status(201).send(result);
  } catch (error) {
    handleControllerError(error, res, "Internal error");
  }
};

const getClass = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await ClassService.getClass(id);
    res.status(200).send(result);
  } catch (error) {
    handleControllerError(error, res, "Internal error");
  }
};

export { getAllClasses, addClass, getClass };
