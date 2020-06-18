import { uploadImage } from "../providers/file_provider";
import { Router } from "express";
const router = Router();

/** configs */
import CONSTANT from "../configs/constant";

/** Controllers */
import {
  saveCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
} from "../controllers/category_controller";

/** define routes */
router
  .get("/category", getAllCategory)
  .get("/category/:cat_id", getCategory)
  .delete("/category/:cat_id", deleteCategory)
  .put("/category/:cat_id", updateCategory)
  /** save image */
  .post(
    "/category",
    saveCategory
  );

export default router;
