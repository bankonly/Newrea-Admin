// helpers
const Res = require("../controllers/default_res_controller");
const Helpers = require("../helpers/Global");
const MostPopular = require("../models/most_popular");

export function validateSaveData(obj, update = false) {
  var error = {};
  var msg = "field is required as string";
  if (!Helpers.isEmpty(obj.body.title)) error.title = msg;
  if (!Helpers.isEmpty(obj.body.desc)) error.desc = msg;
  if (update) {
    if (!obj.files || !obj.files.img) error.img = msg;
  }
  return error;
}

export async function fetch(most_id = null, is_super_admin = false) {
  try {
    var mostData = null;

    var condition = {};
    if (!is_super_admin) {
      condition.is_active = "active";
    }

    if (most_id !== null) {
      if (!Helpers.validateObjectId(most_id)) {
        return Res.badRequest({ msg: "invalid most_id id" });
      }
      condition = { _id: most_id };
      mostData = MostPopular.findOne(condition);
    } else {
      mostData = MostPopular.find(condition);
    }

    const respMostPopular = await mostData.select("-__v");

    // check if accData no data
    if (respMostPopular == null || respMostPopular.length < 1) {
      return Res.notFound({ msg: "no data" });
    }

    return Res.success({ data: respMostPopular });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}
