const express = require("express");

const router = express.Router();

const sellerController = require("./../controllers/seller_controller");
const validator = require("./../middlewares/validations/seller_validator");
const { checkImgUpload } = require("./../middlewares/validations/img_file");
const { uploadImage } = require("./../middlewares/validations/img_file");

router.get("/seller/lists", sellerController.getSellerList);
router.post("/seller/findSeller/:sellerID", sellerController.findSellerByID);
router.post(
  "/seller/createSeller",
  [validator.createValidator, checkImgUpload, uploadImage],
  sellerController.createSeller
);
router.delete(
  "/seller/disableSeller/:sellerID",
  sellerController.disableSeller
);
router.put("/seller/updateSeller/:sellerID", sellerController.updateSeller);

module.exports = router;
