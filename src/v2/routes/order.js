const express = require("express");

const router = express.Router();

const orderController = require("./../controllers/order_controller");

router.get("/order/allOrders", orderController.getOrders);
router.get("/order/asignedOrders", orderController.getAsignedOrders);
router.post("/order/asignToDriver", orderController.asigneToDriver);

module.exports = router;
