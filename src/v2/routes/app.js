import { register, login } from "../controllers/admin_controller";

import { Router } from "express";
const router = Router();

// Route For AdminController 
router.post("/register", register);
router.post("/login", login);

// Seeder  
import { runSeeder } from "../database/seeder/basic_setup";
router.post("/runSeeder", runSeeder);

export default router;
