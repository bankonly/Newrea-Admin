const { Router } = require("express");
const router = Router();
const SubCatCtrl = require("../controllers/sub_category_controller");
const { AccessPermission } = require("../middlewares/AccessPermission");
const mdw = [AccessPermission];

router
  .get("/categories", SubCatCtrl.getAllSubCategory)
  .get("/categories/:cats_id", SubCatCtrl.getSubCategory)
  .delete("/categories/:cats_id", mdw, SubCatCtrl.deleteSubCategory)
  .put("/categories/:cats_id", mdw, SubCatCtrl.updateSubCategory)
  .post("/categories", mdw, SubCatCtrl.saveSubCategory);

export default router;
