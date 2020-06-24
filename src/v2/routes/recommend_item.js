import { Router } from "express";
const router = Router();
const RecCtrl = require("../controllers/recommend_item");
const { AccessPermission } = require("../middlewares/AccessPermission");
const mdw = [AccessPermission];

router
  .get("/recommendItem", RecCtrl.getAllRecommendItem)
  .get("/recommendItem/:rec_id", RecCtrl.getRecommendItem)
  .delete("/recommendItem/:rec_id", mdw, RecCtrl.deleteRecommendItem)
  .put("/recommendItem/:rec_id", mdw, RecCtrl.updateRecommendItem)
  .post("/recommendItem", mdw, RecCtrl.saveRecommendItem);

export default router;
