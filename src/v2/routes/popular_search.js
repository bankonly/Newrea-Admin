const express = require("express");

const router = express.Router();

const popularSearchController = require("./../controllers/popular_search_controller");
const {
  checkValidObjectId,
  deleteValidator,
} = require("./../middlewares/validations/commonValidator");
const { AccessPermission } = require("../middlewares/AccessPermission");

const validator = require("./../middlewares/validations/popular_search_validator");

router.get("/popularSearch", popularSearchController.getPopularSearch);
router.post(
  "/popularSearch",
  [AccessPermission, validator.createValidator],
  popularSearchController.createPopularSearch
);
router.put(
  "/popularSearch/:id",
  [AccessPermission, checkValidObjectId, validator.updateValidator],
  popularSearchController.updatePopularSearch
);
router.delete(
  "/popularSearch/:id",
  [AccessPermission, checkValidObjectId, deleteValidator],
  popularSearchController.updatePopularSearch
);
module.exports = router;
