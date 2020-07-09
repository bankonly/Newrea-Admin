const Joi = require("@hapi/joi");
const paymentMethodModel = require("../../models/PaymentMethodModel");
import Res from "../../controllers/response_controller";

exports.createValidator = async (req, res, next) => {
  const response = new Res(res);
  const data = req.body;
  const reqName = data.name.toLowerCase();
  try {
    const paymentByName = await paymentMethodModel.findOne({ name: data.name });
    if (paymentByName) {
      return response.badRequest({ msg: `name '${reqName}'  aleady exist` });
    }
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
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
    const paymentById = await paymentMethodModel.findOne({ name: data.name });
    if (paymentById && paymentById._id.toString() !== req.params.id) {
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
    });
    await schema.validateAsync(data);
    next();
  } catch (err) {
    console.log(err);
    response.badRequest({ data: err });
  }
};
