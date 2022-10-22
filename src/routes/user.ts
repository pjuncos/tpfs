import { Router } from "express";
import { verifyAuth } from "../middlewares/auth";
import * as UserController from "../controllers/user";

const router = Router();

router.get("/", [verifyAuth], UserController.getAllUsers);
router.post("/", UserController.addUser);
router.put("/:id", [verifyAuth], UserController.editUser);

export default router;
