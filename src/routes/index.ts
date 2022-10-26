import { Router } from "express";
import UserRoutes from "./user";
import ClassRoutes from "./class";
import LoginRoutes from "./login";

const router = Router();
router.use("/classes", ClassRoutes);
router.use("/users", UserRoutes);
router.use("/auth", LoginRoutes);

export default router;
