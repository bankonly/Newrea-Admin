import { Router } from "express";
const router = Router();
const product_masterCtrl = require("../controllers/product_master_controller");

router
  .get("/product_master", product_masterCtrl.getAllproduct_master)
  .get("/product_master/:product_master_id", product_masterCtrl.getproduct_master)
  // .delete("/product_master/:banner_id", product_masterCtrl.deleteproduct_master)
  // .put("/product_master/:banner_id", product_masterCtrl.updateproduct_master)
  // .post("/product_master", product_masterCtrl.saveproduct_master);

export default router;