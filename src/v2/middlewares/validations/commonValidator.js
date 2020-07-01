const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
import Res from "../../controllers/response_controller";

exports.checkValidObjectId = (req, res, next) => {
  const response = new Res(res);
  const key = Object.keys(req.params)[0];
  if (!mongoose.Types.ObjectId.isValid(req.params[key])) {
    return response.badRequest({
      msg: `params ${req.params[key]} is not valid ObjectId`,
    });
  }
  next();
};

exports.deleteValidator = async (req, res, next) => {
  const response = new Res(res);
  try {
    const schema = Joi.object({
      is_active: Joi.string().valid("active", "inactive").required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    console.log(err);
    response.badRequest({ data: err });
  }
};
