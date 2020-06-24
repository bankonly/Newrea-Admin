import { Router } from "express";
const router = Router();
const ProSellerCtrl = require("../controllers/product_seller_controller");

router
  .get("/productSeller", ProSellerCtrl.getAllProductSeller)
  .get("/productSeller/:pro_seller_id", ProSellerCtrl.getProductSeller)
  // .delete("/productSeller/:rs_id", mdw, ProSellerCtrl.deleteProductSeller)
  // .put("/productSeller/:rs_id", mdw, ProSellerCtrl.updateProductSeller)
  // .post("/productSeller", mdw, ProSellerCtrl.saveProductSeller);

export default router;
