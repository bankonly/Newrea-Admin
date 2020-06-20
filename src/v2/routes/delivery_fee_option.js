const express = require("express");

const router = express.Router();

const deliveryFeeController = require("../controllers/delivery_fee_controller");
const validator = require("./../middlewares/validations/delivery_fee_option_validator");

router.get("/deliveryFee/lists", deliveryFeeController.getDeliveryFeeList);
router.post(
  "/deliveryFee/create",
  [validator.createValidator],
  deliveryFeeController.createDeliveryFee
);
router.delete(
  "/deliveryFee/disable/:id",
  deliveryFeeController.disableDeliveryFee
);
router.put(
  "/deliveryFee/update/:id",
  [validator.updateValidator],
  deliveryFeeController.updateDeliveryFee
);

module.exports = router;
