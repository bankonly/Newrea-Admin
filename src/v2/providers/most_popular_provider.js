/** helpers */
const { isString, isEmpty, validateObjectId } = require("../helpers/Global");

/** providers */
const { isIdExist } = require("../helpers/query_builder");

/** Models */
const { MostPopular } = require("../models/most_popular");

/** controller */
import Res from "../controllers/default_res_controller";

export const validateSaveData = (obj) => {
  var error = {};
  var msg = "field is required as string";
  if (!isEmpty(obj.body.title)) error.title = msg;
  if (!isEmpty(obj.body.desc)) error.desc = msg;
  if (!obj.files.img) error.img = msg;
  return error;
};

export const _getMostPopular = async (
  most_id = null,
  is_super_admin = false
) => {
  try {
    var mostData = null;

    var condition = {};
    if (!is_super_admin) {
      condition.is_active = "active";
    }

    if (most_id !== null) {
      if (!validateObjectId(most_id)) {
        return Res.badRequest({ msg: "invalid most_id id" });
      }
      condition = { _id: most_id };
      mostData = MostPopular.findOne(condition);
    } else {
      mostData = MostPopular.find(condition);
    }

    const respMostPopular = await mostData.select("-__v");

    /** check if accData no data */
    if (respMostPopular == null || respMostPopular.length < 1) {
      return Res.notFound({ msg: "no category data data" });
    }

    return Res.success({ data: respMostPopular });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};
