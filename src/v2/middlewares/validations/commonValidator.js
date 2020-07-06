const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
import Res from "../../controllers/response_controller";
const AdminProvider = require("../../providers/admin_provider");

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
exports.resetPasswordValidator = async (req, res, next) => {
  const response = new Res(res);
  try {
    const stt = await AdminProvider.verifyPassword(req.auth._id, req.body.adminPassword);
    // return res.json(req.auth._id)
    if (!stt.status) {
      throw new Error(stt.msg);
    }
    if (req.body.password !== req.body.confirmPassword) {
      throw new Error("password not match");
    }
    next();
  } catch (err) {
    console.log(err);
    response.badRequest({ data: err.message });
  }
};
