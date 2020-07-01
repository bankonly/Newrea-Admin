const express = require("express");

const router = express.Router();

const currencyController = require("./../controllers/currency_controller");
const validator = require("./../middlewares/validations/currency_validator");
const {
  checkValidObjectId,
  deleteValidator,
} = require("./../middlewares/validations/commonValidator");

router.get("/currency", currencyController.getCurrency);
router.post(
  "/currency",
  [validator.createValidator],
  currencyController.createCurrency
);
router.put(
  "/currency/:id",
  [checkValidObjectId, validator.updateValidator],
  currencyController.actionCurrency
);
router.delete(
  "/currency/:id",
  [checkValidObjectId, deleteValidator],
  currencyController.actionCurrency
);

module.exports = router;
