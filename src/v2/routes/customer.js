const express = require("express");

const router = express.Router();

const customerController = require("./../controllers/customer_controller");

router.get("/customer/getCustomers", customerController.getCustomers);

module.exports = router;
