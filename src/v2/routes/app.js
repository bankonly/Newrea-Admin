import { register, login } from "../controllers/admin_controller";

import { Router } from "express";
const router = Router();

/** Route For AdminController */
router.post("/register", register);
router.post("/login", login);

export default router;
