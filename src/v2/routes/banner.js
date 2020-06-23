import { Router } from "express";
const router = Router();
const BannerCtrl = require("../controllers/banner_controller");
const { AccessPermission } = require("../middlewares/AccessPermission");

router
  .get("/banner", BannerCtrl.getAllBanner)
  .get("/banner/:banner_id", BannerCtrl.getBanner)
  .delete("/banner/:banner_id", [AccessPermission], BannerCtrl.deleteBanner)
  .put("/banner/:banner_id", [AccessPermission], BannerCtrl.updateBanner)
  .post("/banner", [AccessPermission], BannerCtrl.saveBanner);

export default router;
