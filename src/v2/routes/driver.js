const express = require("express");

const router = express.Router();

const driverController = require("./../controllers/driver_controller");
const {
  checkValidObjectId,
  deleteValidator,
  resetPasswordValidator,
} = require("./../middlewares/validations/commonValidator");
const { AccessPermission } = require("../middlewares/AccessPermission");

const validator = require("./../middlewares/validations/driver_validator");
const { checkImgUpload } = require("./../middlewares/validations/img_file");

router.get("/driver", driverController.getDrivers);
router.post(
  "/driver",
  [AccessPermission, validator.createValidator, checkImgUpload],
  driverController.createDriver
);
router.put(
  "/driver/:id",
  [AccessPermission, checkValidObjectId, validator.updateValidator],
  driverController.updateDriver
);
router.delete(
  "/driver/:id",
  [AccessPermission, checkValidObjectId, deleteValidator],
  driverController.updateDriver
);
router.put(
  "/driver/updateImg/:id",
  [AccessPermission, checkValidObjectId, checkImgUpload],
  driverController.updateDriverImg
);
router.put(
  "/driver/resetPassword/:id",
  [AccessPermission, resetPasswordValidator, checkValidObjectId],
  driverController.resetPassword
);
module.exports = router;
