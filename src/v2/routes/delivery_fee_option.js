const express = require("express");

const router = express.Router();

const deliveryFeeController = require("../controllers/delivery_fee_controller");
const validator = require("./../middlewares/validations/delivery_fee_option_validator");
const {
  checkValidObjectId,
  deleteValidator,
} = require("./../middlewares/validations/commonValidator");
const { AccessPermission } = require("../middlewares/AccessPermission");

router.get("/deliveryFee/lists", deliveryFeeController.getDeliveryFeeList);
router.post(
  "/deliveryFee/create",
  [AccessPermission, validator.createValidator],
  deliveryFeeController.createDeliveryFee
);

router.delete(
  "/deliveryFee/disable/:id",
  [AccessPermission, checkValidObjectId, deleteValidator],
  deliveryFeeController.enableDisableDliveryFee
);
router.put(
  "/deliveryFee/update/:id",
  [AccessPermission, checkValidObjectId, validator.updateValidator],
  deliveryFeeController.updateDeliveryFee
);

module.exports = router;
