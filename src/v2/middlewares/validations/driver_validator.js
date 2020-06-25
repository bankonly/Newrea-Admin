const Joi = require("@hapi/joi");
const driverModel = require("../../models/driverModel");
import Res from "../../controllers/response_controller";

exports.createValidator = async (req, res, next) => {
  const response = new Res(res);
  const data = req.body;
  try {
    // return res.send(data.user_name);
    if (await driverModel.findOne({ user_name: data.user_name })) {
      return response.badRequest({
        msg: `user name for driver '${data.user_name}' aleady exist`,
      });
    }
    const schema = Joi.object({
      user_name: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      password: Joi.string().required(),
      phone_number: Joi.string().required(),
      dri_status: Joi.string().valid("true", "false").required(),
      is_working: Joi.string().valid("true", "false").required(),
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
    const foundDriver = await driverModel.findOne({
      user_name: data.user_name,
    });
    // check key word is exist?
    if (foundDriver && foundDriver._id.toString() !== req.params.id) {
      return response.badRequest({
        msg: `user name for driver '${data.user_name}' aleady exist`,
      });
    }
    const schema = Joi.object({
      user_name: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      phone_number: Joi.string().required(),
      dri_status: Joi.string().valid("true", "false").required(),
    });
    await schema.validateAsync(data);
    next();
  } catch (err) {
    return response.badRequest({ data: err });
  }
};
