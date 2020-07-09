const Res = require("../controllers/default_res_controller");
const DeliveryTypeModel = require("../models/DeliveryTypeModel");
const Helpers = require("../helpers/Global");

// validate save data
export function validate(obj, update = false) {
  var error = {};
  let msg = "field is required";
  console.log(obj.body)
  if (!Helpers.isEmpty(obj.body.name)) error.name = msg;
  if (!Helpers.isEmpty(obj.body.price,"number")) error.price = msg + " as number";
  if (!Helpers.isEmpty(obj.body.time)) error.time = msg;
  if (update) {
    if (!Helpers.validateObjectId(obj.params.delvery_type_id)) {
      error.delvery_type_id = "invalid id";
    }
  }
  return error;
}
