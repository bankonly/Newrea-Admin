/** helpers */
const { isString, isEmpty, validateObjectId } = require("../helpers/Global");

/** Models */
const { MostPopular } = require("../models/most_popular");

/** controller */
import Res from "../controllers/default_res_controller";

export const validateSaveData = (obj) => {
  var error = {};
  var msg = "field is required as string";
  if (!isEmpty(obj.title)) error.title = msg;
  if (!isEmpty(obj.desc)) error.desc = msg;
  return error;
};

export const _getMostPopular = async (most_id = null) => {
  try {
    var mostData = null;
    if (most_id !== null) {
      if (!validateObjectId(most_id)) {
        return Res.badRequest({ msg: "invalid most_id id" });
      }
      mostData = MostPopular.findOne({
        _id: most_id,
        parent_id: null,
      });
    } else {
      mostData = MostPopular.find({ parent_id: null });
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
