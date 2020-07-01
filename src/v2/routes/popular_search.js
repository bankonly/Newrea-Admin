const express = require("express");

const router = express.Router();

const popularSearchController = require("./../controllers/popular_search_controller");
const {
  checkValidObjectId,
  deleteValidator,
} = require("./../middlewares/validations/commonValidator");

const validator = require("./../middlewares/validations/popular_search_validator");

router.get("/popularSearch", popularSearchController.getPopularSearch);
router.post(
  "/popularSearch",
  [validator.createValidator],
  popularSearchController.createPopularSearch
);
router.put(
  "/popularSearch/:id",
  [checkValidObjectId, validator.updateValidator],
  popularSearchController.updatePopularSearch
);
router.delete(
  "/popularSearch/:id",
  [checkValidObjectId, deleteValidator],
  popularSearchController.updatePopularSearch
);
module.exports = router;
