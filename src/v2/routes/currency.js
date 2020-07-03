const express = require("express");

const router = express.Router();

const currencyController = require("./../controllers/currency_controller");
const validator = require("./../middlewares/validations/currency_validator");
const {
  checkValidObjectId,
  deleteValidator,
} = require("./../middlewares/validations/commonValidator");
const { AccessPermission } = require("../middlewares/AccessPermission");


router.get("/currency", currencyController.getCurrency);
router.post(
  "/currency",
  [AccessPermission,validator.createValidator],
  currencyController.createCurrency
);
router.put(
  "/currency/:id",
  [AccessPermission,checkValidObjectId, validator.updateValidator],
  currencyController.actionCurrency
);
router.delete(
  "/currency/:id",
  [AccessPermission,checkValidObjectId, deleteValidator],
  currencyController.actionCurrency
);

module.exports = router;
