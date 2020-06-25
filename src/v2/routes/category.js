const { Router } = require("express");
const router = Router();
const CatCtrl = require("../controllers/category_controller");
const { AccessPermission } = require("../middlewares/AccessPermission");
const mdw = [AccessPermission];

router
  .get("/category", CatCtrl.getAllCategory)
  .get("/category/child/:parent_id", CatCtrl.getChildCategory)
  .get("/category/:cat_id", CatCtrl.getCategory)
  .delete("/category/:cat_id", mdw, CatCtrl.deleteCategory)
  .put("/category/:cat_id", mdw, CatCtrl.updateCategory)
  .post("/category", mdw, CatCtrl.saveCategory);

export default router;
