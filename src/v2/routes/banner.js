import { Router } from "express";
const router = Router();
const BannerCtrl = require("../controllers/banner_controller");
const { AccessPermission } = require("../middlewares/AccessPermission");
const mdw = [AccessPermission];
router
  .get("/banner", BannerCtrl.getAllBanner)
  .get("/banner/:banner_id", BannerCtrl.getBanner)
  .delete("/banner/:banner_id", mdw, BannerCtrl.deleteBanner)
  .put("/banner/:banner_id", mdw, BannerCtrl.updateBanner)
  .post("/banner", mdw, BannerCtrl.saveBanner);

export default router;
