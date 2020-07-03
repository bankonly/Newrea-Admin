const express = require("express");
const router = express.Router();

const validator = require("./../middlewares/validations/payment_method_validator");
const {
  checkValidObjectId,
  deleteValidator,
} = require("./../middlewares/validations/commonValidator");
const { AccessPermission } = require("../middlewares/AccessPermission");

const paymentMethodController = require("./../controllers/payment_method_controller");

router.get("/paymentMethod", paymentMethodController.getPaymentMethods);
router.post(
  "/paymentMethod",
  [AccessPermission, validator.createValidator],
  paymentMethodController.createPaymentMethod
);
router.put(
  "/paymentMethod/:id",
  [AccessPermission, checkValidObjectId, validator.updateValidator],
  paymentMethodController.updatePaymentMethod
);
router.delete(
  "/paymentMethod/:id",
  [AccessPermission, checkValidObjectId, deleteValidator],
  paymentMethodController.updatePaymentMethod
);

module.exports = router;
