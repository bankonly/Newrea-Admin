const express = require("express");

const router = express.Router();

const orderController = require("./../controllers/order_controller");
const validator = require("./../middlewares/validations/order_validator");
const { AccessPermission } = require("../middlewares/AccessPermission");
const mdw = [AccessPermission];

router.get("/order/allOrders",mdw, orderController.getOrders);
router.get("/order/asignedOrders", orderController.getAsignedOrders);
router.post(
  "/order/asignToDriver",
  [validator.asignValidator],
  orderController.asigneToDriver
);

module.exports = router;
