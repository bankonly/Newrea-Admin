import { Router } from "express";
const router = Router();
const product_optionCtrl = require("../controllers/product_option_controller");

router
  .get("/product_option", product_optionCtrl.getAllproduct_option)
  .get("/product_option/:product_option_id", product_optionCtrl.getproduct_option)
  // .delete("/product_option/:banner_id", product_optionCtrl.deleteproduct_option)
  // .put("/product_option/:banner_id", product_optionCtrl.updateproduct_option)
  // .post("/product_option", product_optionCtrl.saveproduct_option);

export default router;