import { Router } from "express";
const router = Router();
const DelCtrl = require("../controllers/delivery_type_controller");
const { AccessPermission } = require("../middlewares/AccessPermission");
const mdw = [AccessPermission];

router
  .get("/delivery_type", DelCtrl.getAlldelivery_type)
  .get("/delivery_type/:delvery_type_id", DelCtrl.getdelivery_type)
  .delete("/delivery_type/:delvery_type_id", mdw, DelCtrl.deletedelivery_type)
  .put("/delivery_type/:delvery_type_id", mdw, DelCtrl.updatedelivery_type)
  .post("/delivery_type", mdw, DelCtrl.savedelivery_type);

export default router;
