import { Router } from "express";
const router = Router();

/** Controllers */
import {
  saveBanner,
  updateBanner,
  deleteBanner,
  getAllBanner,
  getBanner,
} from "../controllers/banner_controller";

/** define routes */
router
  .get("/banner", getAllBanner)
  .get("/banner/:banner_id", getBanner)
  .delete("/banner/:banner_id", deleteBanner)
  .put("/banner/:banner_id", updateBanner)
  .post("/banner", saveBanner);

export default router;
