import { Router } from "express";
import * as LoginController from "../controllers/auth";

const router = Router();

router.post("/", LoginController.login);

export default router;
