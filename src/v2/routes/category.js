import { Router } from "express";
const router = Router();

import multer from "multer";

// configs 
import CONSTANT from "../configs/constant";

// Controllers 
import {
  saveCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
} from "../controllers/category_controller";

// define routes 
router
  .get("/category", getAllCategory)
  .get("/category/:cat_id", getCategory)
  .delete("/category/:cat_id", deleteCategory)
  .put("/category/:cat_id", updateCategory)
  .post("/category", saveCategory);

export default router;
