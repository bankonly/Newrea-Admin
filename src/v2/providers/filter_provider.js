const Res = require("../controllers/default_res_controller");
const filter = require("../models/filter");
const Helpers = require("../helpers/Global");

// validate save data
export function validate(obj, update = false) {
  var error = {};

  let msg_str = "field is required";
  let msg_arr = " as array";
  let msg_num = " as number";
  let msg_as_str = " as string";

  if (!Helpers.isEmpty(obj.body.name)) error.name = msg_str;
  if (!Helpers.isArray(obj.body.brand) || obj.body.brand.length == 0) {
    error.brand = msg_str + msg_arr;
  } else {
    obj.body.brand.map((value) => {
      if (!Helpers.isEmpty(value)) {
        error.brand = msg_str + msg_as_str;
      }
    });
  }

  if (!Helpers.isArray(obj.body.gender) || obj.body.gender.length == 0) {
    error.gender = msg_str + msg_arr;
  } else {
    obj.body.gender.map((value) => {
      if (!Helpers.isEmpty(value)) {
        error.gender = msg_str + msg_as_str;
      }
    });
  }

  if (typeof obj.body.price !== "object") {
    error.price = msg_str + " as object";
  } else {
    const isprice = Helpers.isKey({
      arr: obj.body.price,
      acceptKey: ["min", "max"],
      type: "object",
    });
    if (isprice.length > 0) error.price = isprice;
    if (!Helpers.isEmpty(obj.body.price.min, "number")) {
      error.min = msg_str + msg_num;
    }
    if (!Helpers.isEmpty(obj.body.price.max, "number")) {
      error.max = msg_str + msg_num;
    }
  }
  if (!Helpers.isArray(obj.body.size) || obj.body.size.length == 0)
    error.size = msg_str + msg_arr;
  if (!Helpers.isArray(obj.body.color) || obj.body.color.length == 0)
    error.color = msg_str + msg_arr;

  // validate inside array of
  const size = obj.body.size;
  const color = obj.body.color;

  if (Helpers.isArray(size)) {
    const isSize = Helpers.isKey({
      arr: size,
      acceptKey: ["text", "number"],
    });
    if (isSize.length > 0) error.size = isSize;
  }

  if (Helpers.isArray(color)) {
    const isColor = Helpers.isKey({
      arr: color,
      acceptKey: ["color", "value"],
    });
    if (isColor.length > 0) error.color = isColor;
  }

  if (update) {
    if (!Helpers.validateObjectId(obj.params.filter_id)) {
      error.invalid = "invalid id";
    }
  }
  return error;
}