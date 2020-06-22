const express = require("express");

const router = express.Router();

const sellerController = require("./../controllers/seller_controller");
const validator = require("./../middlewares/validations/seller_validator");
const { checkImgUpload } = require("./../middlewares/validations/img_file");
const {
  checkValidObjectId,
} = require("./../middlewares/validations/seller_validator");

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
  [checkValidObjectId],
  sellerController.disableSeller
);
router.put(
  "/seller/updateSeller/:sellerID",
  [checkValidObjectId, validator.createValidator],
  sellerController.updateSeller
);

module.exports = router;
