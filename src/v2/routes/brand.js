const express = require("express");

const router = express.Router();

const brandController = require("./../controllers/brand_controller");
const {
  checkValidObjectId,
  deleteValidator,
} = require("./../middlewares/validations/commonValidator");
const { AccessPermission } = require("../middlewares/AccessPermission");

const validator = require("./../middlewares/validations/brand_validator");
const { checkImgUpload } = require("./../middlewares/validations/img_file");

router.get("/brand", brandController.getBrands);
router.post(
  "/brand",
  [AccessPermission, validator.createValidator, checkImgUpload],
  brandController.createBrand
);
router.put(
  "/brand/:id",
  [AccessPermission, checkValidObjectId, validator.updateValidator],
  brandController.updateBrand
);
router.delete(
  "/brand/:id",
  [AccessPermission, checkValidObjectId, deleteValidator],
  brandController.updateBrand
);
router.put(
  "/brand/updateImg/:id",
  [AccessPermission, checkValidObjectId, checkImgUpload],
  brandController.updateBrandLogo
);
module.exports = router;
