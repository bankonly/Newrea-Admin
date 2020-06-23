const { Router } = require("express");
const router = Router();
const CatCtrl = require("../controllers/category_controller");

router
  .get("/category", CatCtrl.getAllCategory)
  .get("/category/:cat_id", CatCtrl.getCategory)
  .delete("/category/:cat_id", CatCtrl.deleteCategory)
  .put("/category/:cat_id", CatCtrl.updateCategory)
  .post("/category", CatCtrl.saveCategory);

export default router;
