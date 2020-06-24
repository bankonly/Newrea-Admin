const Res = require("../controllers/default_res_controller");
const Banner = require("../models/main_banner");
const { isDate, compareBtwDate } = require("../helpers/Global");
const Helpers = require("../helpers/Global");

// validate save data
export function validate(obj, update = true) {
  const body = obj.body;
  var error = {};
  var msg = "field is required";
  
  if (!Helpers.isEmpty(body.title)) error.title = msg;
  if (!Helpers.isEmpty(body.desc)) error.desc = msg;

  if (!Helpers.isEmptyObj(error)) return error;

  const isValid = Helpers.multipleValidateObj(obj.body, [], "array", {});
  if (isValid.length > 0) error = isValid;
  // if (!Helpers.isArray(body.new_arrivals)) error.new_arrivals = arrayMsg;
  // if (!Helpers.isArray(body.cat_id)) error.cat_id = arrayMsg;
  // if (!Helpers.isArray(body.popular_item)) error.popular_item = arrayMsg;
  // if (!Helpers.isArray(body.brand)) error.brand = arrayMsg;
  // if (!Helpers.isArray(body.clearance_item)) error.clearance_item = arrayMsg;
  // if (!Helpers.isArray(body.accessories)) error.accessories = arrayMsg;
  // if (!Helpers.isArray(body.recommend_store)) error.recommend_store = arrayMsg;

  if (update) {
    if (!Helpers.isFile(obj.files, "img")) {
      error.img = msg = " as image";
    }
  }
  return error;
}
