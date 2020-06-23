import { Router } from "express";
const router = Router();
const BannerCtrl = require("../controllers/banner_controller");

router
  .get("/banner", BannerCtrl.getAllBanner)
  .get("/banner/:banner_id", BannerCtrl.getBanner)
  .delete("/banner/:banner_id", BannerCtrl.deleteBanner)
  .put("/banner/:banner_id", BannerCtrl.updateBanner)
  .post("/banner", BannerCtrl.saveBanner);

export default router;
