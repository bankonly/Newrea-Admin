const express = require("express");

const router = express.Router();

const orderController = require("./../controllers/order_controller");
const validator = require("./../middlewares/validations/order_validator");
const { AccessPermission } = require("../middlewares/AccessPermission");

router.get("/order/allOrders", orderController.getOrders);
router.get("/order/asignedOrders", orderController.getAsignedOrders);
router.post(
  "/order/asignToDriver",
  [AccessPermission, validator.asignValidator],
  orderController.asigneToDriver
);

module.exports = router;
