const express = require("express");

const router = express.Router();

const deliveryFeeController = require("../controllers/delivery_fee_controller");
const validator = require("./../middlewares/validations/delivery_fee_option_validator");
const {
  checkValidObjectId,
  deleteValidator,
} = require("./../middlewares/validations/commonValidator");

router.get("/deliveryFee/lists", deliveryFeeController.getDeliveryFeeList);
router.post(
  "/deliveryFee/create",
  [validator.createValidator],
  deliveryFeeController.createDeliveryFee
);

router.delete(
  "/deliveryFee/disable/:id",
  [checkValidObjectId, deleteValidator],
  deliveryFeeController.enableDisableDliveryFee
);
router.put(
  "/deliveryFee/update/:id",
  [checkValidObjectId, validator.updateValidator],
  deliveryFeeController.updateDeliveryFee
);

module.exports = router;
