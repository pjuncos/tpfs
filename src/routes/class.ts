import { Router } from "express";
import { verifyAuth } from "../middlewares/auth";
import * as ClassController from "../controllers/class";
import { ROLES } from "../models/user";

const router = Router();

router.get("/", verifyAuth([ROLES.ADMIN]), ClassController.getAllClasses);
router.post("/", verifyAuth(), ClassController.addClass);
router.get("/:id", verifyAuth(), ClassController.getClass);

export default router;
