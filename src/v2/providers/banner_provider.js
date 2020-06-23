const Res = require("../controllers/default_res_controller");
const Banner = require("../models/main_banner");
const { isDate, compareBtwDate } = require("../helpers/Global");

// validate save data
export function validate_add(obj, update = true) {
  var error = {};
  var msg = "field is required as only date";
  if (!obj.body.start_date || !isDate(obj.body.start_date)) {
    error.start_date = msg;
  }
  if (!obj.body.end_date || !isDate(obj.body.end_date)) {
    error.end_date = msg;
  }
  if (isDate(obj.body.end_date) && isDate(obj.body.start_date)) {
    if (!compareBtwDate(obj.body.start_date, obj.body.end_date)) {
      error.end_date = "can not smaller than start_date";
    }
  } else {
    error.end_date = "invalid date";
    error.start_date = "invalid date";
  }

  if (update) {
    if (!obj.files || !obj.files.img) {
      error.img = "required as file";
    }
  }

  return error;
}
