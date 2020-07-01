const express = require("express");

const router = express.Router();

const customerAddressController = require("./../controllers/customer_address_controller");

router.get("/customerAddress", customerAddressController.getCustomerAddress);

module.exports = router;
