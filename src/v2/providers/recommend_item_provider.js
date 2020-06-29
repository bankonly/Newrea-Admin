const Res = require("../controllers/default_res_controller");
const Helpers = require("../helpers/Global");

export function validate(obj, update = false) {
  var error = {};
  var msg = "field is required";
  if (!Helpers.isEmpty(obj.body.product_seller_id)) {
    error.product_seller_id = msg;
  }
  if (!Helpers.validateObjectId(obj.body.product_seller_id)) {
    error.product_seller_id = "invalid id";
  }

  if (update) {
    if (!Helpers.validateObjectId(obj.params.rec_id)) {
      error.rec_id = "invalid id";
    }
  }
  return error;
}

export const default_populate = {
  path: "product_seller_id",
};
