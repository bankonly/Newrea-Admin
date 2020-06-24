const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const popularSearchModel = require("../../models/popular_search");
import Res from "../../controllers/response_controller";

exports.createValidator = async (req, res, next) => {
  const response = new Res(res);
  const data = req.body;
  try {
    if (await popularSearchModel.findOne({ keyWord: data.keyWord })) {
      return response.badRequest({
        msg: `key word '${data.keyWord}' aleady exist`,
      });
    }
    const schema = Joi.object({
      keyWord: Joi.string().required(),
      is_active: Joi.string().valid("active", "inActive").allow(""),
    });
    await schema.validateAsync(data);
    next();
  } catch (err) {
    return response.badRequest({ data: err });
  }
};

exports.updateValidator = async (req, res, next) => {
  const response = new Res(res);
  const data = req.body;

  try {
    const foundKeyWord = await popularSearchModel.findOne({
      keyWord: data.keyWord,
    });
    // check key word is exist?
    if (foundKeyWord && foundKeyWord._id.toString() !== req.params.id) {
      return response.badRequest({
        msg: `key word '${data.keyWord}' aleady exist`,
      });
    }
    const schema = Joi.object({
      keyWord: Joi.string().required(),
    });
    await schema.validateAsync(data);
    next();
  } catch (err) {
    return response.badRequest({ data: err });
  }
};
