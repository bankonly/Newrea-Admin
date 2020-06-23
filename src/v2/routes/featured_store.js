import { Router } from "express";
const router = Router();
const FeatCtrl = require("../controllers/featured_store_controller");
const { AccessPermission } = require("../middlewares/AccessPermission");

const mdw = [AccessPermission];
router
  .get("/featured_store", FeatCtrl.getAllFeaturedStore)
  .get("/featured_store/:feat_id", FeatCtrl.getFeaturedStore)
  .delete("/featured_store/:feat_id", mdw, FeatCtrl.deleteFeaturedStore)
  .put("/featured_store/:feat_id", mdw, FeatCtrl.updateFeaturedStore)
  .post("/featured_store", mdw, FeatCtrl.saveFeaturedStore);

export default router;
