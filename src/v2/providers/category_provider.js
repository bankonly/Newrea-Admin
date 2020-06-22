const Res = require("../controllers/default_res_controller");

// Models
const Category = require("../models/category");

// helpers
const Helpers = require("../helpers/Global");

// validate save data
export function validateSaveData(obj) {
  var error = {};
  var msg = "field is required";
  if (!obj.body.name) error.name = msg;
  if (!obj.files.img) error.img = msg;
  return error;
}

// // get category
export async function fetch(cat_id = null, is_super_admin = false) {
  try {
    var catData = null;
    var condition = {
      parent_id: null,
    };

    if (!is_super_admin) {
      condition.is_active = "active";
    }

    if (cat_id !== null) {
      if (!Helpers.validateObjectId(cat_id)) {
        return Res.badRequest({ msg: "invalid cat_id id" });
      }
      condition._id = cat_id;
      catData = Category.findOne(condition);
    } else {
      catData = Category.find(condition);
    }

    const respCategory = await catData.select("-__v");

    // check if accData no data
    if (respCategory == null || respCategory.length < 1) {
      return Res.notFound({ msg: "no category data data" });
    }

    return Res.success({ data: respCategory });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}
