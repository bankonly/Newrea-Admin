const Joi = require("@hapi/joi");
const brandModel = require("../../models/brand");
import Res from "../../controllers/response_controller";

exports.createValidator = async (req, res, next) => {
  const response = new Res(res);
  const data = req.body;
  try {
    if (await brandModel.findOne({ name: data.name })) {
      return response.badRequest({
        msg: `brand '${data.name}' aleady exist`,
      });
    }
    const schema = Joi.object({
      name: Joi.string().required(),
      desc: Joi.string().allow(""),
      is_active: Joi.string().valid("active", "inactive").allow(""),
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
    const foundBrand = await brandModel.findOne({
      name: data.name,
    });
    // check key word is exist?
    if (foundBrand && foundBrand._id.toString() !== req.params.id) {
      return response.badRequest({
        msg: `brand '${data.name}' aleady exist`,
      });
    }
    const schema = Joi.object({
      name: Joi.string().required(),
      desc: Joi.string().allow(""),
    });
    await schema.validateAsync(data);
    next();
  } catch (err) {
    return response.badRequest({ data: err });
  }
};
