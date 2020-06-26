const express = require("express");

const router = express.Router();

const orderController = require("./../controllers/order_controller");

router.get("/order/allOrders", orderController.getOrders);

module.exports = router;
