const express = require("express");

const router = express.Router();

const driverController = require("./../controllers/driver_controller");
const {
  checkValidObjectId,
  deleteValidator,
} = require("./../middlewares/validations/commonValidator");

const validator = require("./../middlewares/validations/driver_validator");
const { checkImgUpload } = require("./../middlewares/validations/img_file");

router.get("/driver", driverController.getDrivers);
router.post(
  "/driver",
  [validator.createValidator, checkImgUpload],
  driverController.createDriver
);
router.put(
  "/driver/:id",
  [checkValidObjectId, validator.updateValidator],
  driverController.updateDriver
);
router.delete(
  "/driver/:id",
  [checkValidObjectId, deleteValidator],
  driverController.updateDriver
);
router.put(
  "/driver/updateImg/:id",
  [checkValidObjectId, checkImgUpload],
  driverController.updateDriverImg
);
module.exports = router;
