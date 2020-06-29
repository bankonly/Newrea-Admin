const express = require("express");

const router = express.Router();

const currencyController = require("./../controllers/currency_controller");

router.get("/currency", currencyController.getCurrency);

module.exports = router;
