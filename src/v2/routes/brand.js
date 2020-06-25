const express = require("express");

const router = express.Router();

const brandController = require("./../controllers/brand_controller");
const {
  checkValidObjectId,
  deleteValidator,
} = require("./../middlewares/validations/commonValidator");

const validator = require("./../middlewares/validations/brand_validator");
const { checkImgUpload } = require("./../middlewares/validations/img_file");

router.get("/brand", brandController.getBrands);
router.post(
  "/brand",
  [validator.createValidator, checkImgUpload],
  brandController.createBrand
);
router.put(
  "/brand/:id",
  [checkValidObjectId, validator.updateValidator],
  brandController.updateBrand
);
router.delete(
  "/brand/:id",
  [checkValidObjectId, deleteValidator],
  brandController.updateBrand
);
router.put(
  "/brand/updateImg/:id",
  [checkValidObjectId, checkImgUpload],
  brandController.updateBrandLogo
);
module.exports = router;
