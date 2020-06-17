import kernel from "../configs/kernel";
import AdminCtl from "../controllers/AdminController";

import express from "express";
const router = express.Router();

/** Route For AdminController */
router.post("/register", (...args) => AdminCtl(...args).register());
router.post("/login", (...args) => AdminCtl(...args).login());

export default router;
