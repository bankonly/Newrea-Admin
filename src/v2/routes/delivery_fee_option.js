const express = require("express");

const router = express.Router();

const deliveryFeeController = require("../controllers/delivery_fee_controller");
const validator = require("./../middlewares/validations/delivery_fee_option");

router.post(
  "/deliveryFee/create",
  [validator.create],
  deliveryFeeController.createDeliveryFee
);
router.post("/deliveryFee/lists", deliveryFeeController.getDeliveryFeeList);
router.post(
  "/deliveryFee/disable/:id",
  deliveryFeeController.disableDeliveryFee
);
router.post(
  "/deliveryFee/update/:id",
  [validator.create],
  deliveryFeeController.updateDeliveryFee
);

module.exports = router;
