import { Router } from "express";
import UserRoutes from "./user";
import LoginRoutes from "./login";

const router = Router();
router.use("/users", UserRoutes);
router.use("/login", LoginRoutes);

export default router;
