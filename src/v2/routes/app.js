const { register, login } = require("../controllers/admin_controller");
const { Router } = require("express");
const router = Router();
const { runSeeder } = require("../database/seeder/basic_setup");

// Route For AdminController
router.post("/register", register);
router.post("/login", login);

// Seeder
router.post("/runSeeder", runSeeder);

export default router;
