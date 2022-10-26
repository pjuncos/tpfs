import { Router } from "express";
import * as LoginController from "../controllers/auth";
import { verifyAuth } from "../middlewares/auth";

const router = Router();

router.post("/login", LoginController.login);
router.get("/info", verifyAuth(), LoginController.userInfo);

export default router;
