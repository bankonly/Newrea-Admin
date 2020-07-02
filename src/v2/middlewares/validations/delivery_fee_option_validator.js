const Joi = require("@hapi/joi");
const deliveryFeeOptionModel = require("../../models/delivery_fee_option");
import Res from "../../controllers/response_controller";

exports.createValidator = async (req, res, next) => {
  const response = new Res(res);
  const data = req.body;
  const reqName = data.name.toLowerCase();
  try {
    const dvlByname = await deliveryFeeOptionModel.findOne({ name: data.name });
    if (dvlByname) {
      return response.badRequest({ msg: `name '${reqName}'  aleady exist` });
    }
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      percen: Joi.number().positive().required(),
      is_active: Joi.string().valid("active", "inactive").required(),
    });
    await schema.validateAsync(data);
    next();
  } catch (err) {
    console.log(err);
    response.badRequest({ data: err });
  }
};

exports.updateValidator = async (req, res, next) => {
  const response = new Res(res);
  const data = req.body;
  const reqName = data.name.toLowerCase();
  try {
    const dvlByname = await deliveryFeeOptionModel.findOne({ name: data.name });
    if (dvlByname && dvlByname._id.toString() !== req.params.id) {
      return response.badRequest({
        msg: `name '${reqName}' aleady exist`,
      });
    }
  } catch (ex) {
    console.log(ex);
    response.badRequest({ data: ex });
  }

  try {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      percen: Joi.number().positive().required(),
    });
    await schema.validateAsync(data);
    next();
  } catch (err) {
    console.log(err);
    response.badRequest({ data: err });
  }
};
