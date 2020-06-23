const express = require("express");

const router = express.Router();

const sellerController = require("./../controllers/seller_controller");
const validator = require("./../middlewares/validations/seller_validator");
const { checkImgUpload } = require("./../middlewares/validations/img_file");
const {
  checkValidObjectId,
  deleteValidator,
} = require("./../middlewares/validations/commonValidator");

router.get("/seller/lists", sellerController.getSellerList);
router.post("/seller/findSeller/:sellerID", sellerController.findSellerByID);
router.post(
  "/seller/createSeller",
  [
    validator.createValidator,
    checkImgUpload,
    //
    //
  ],
  sellerController.createSeller
);
router.delete(
  "/seller/disableSeller/:sellerID",
  [checkValidObjectId, deleteValidator],
  sellerController.enableDisableSeller
);
router.put(
  "/seller/updateSeller/:sellerID",
  [checkValidObjectId, validator.createValidator],
  sellerController.updateSeller
);

router.put(
  "/seller/updateSellerIamges/:sellerID",
  [
    checkValidObjectId,
    checkImgUpload,
    //
    //
  ],
  sellerController.updateSellerImages
);

module.exports = router;
