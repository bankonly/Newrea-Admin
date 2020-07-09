const Joi = require("@hapi/joi");
const currencyMethodModel = require("../../models/CurrencyModel");
import Res from "../../controllers/response_controller";

exports.createValidator = async (req, res, next) => {
  const response = new Res(res);
  try {
    const reqData = req.body;
    const reqName = reqData.name.toUpperCase();
    const reqSymbol = reqData.symbol;
    // check currency name is exist() ?
    const currencyByName = await currencyMethodModel.findOne({
      name: reqName,
    });
    if (currencyByName) {
      return response.badRequest({
        msg: `currency '${reqName}'  aleady exist`,
      });
    }
    // check currency symbol is exist() ?
    const currencyBySymbol = await currencyMethodModel.findOne({
      symbol: reqSymbol,
    });
    if (currencyBySymbol) {
      return response.badRequest({
        msg: `symbol '${reqSymbol}'  aleady exist`,
      });
    }
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      symbol: Joi.string().min(1).max(1).required(),
      is_active: Joi.string().valid("active", "inactive").allow(""),
    });
    await schema.validateAsync(reqData);
    next();
  } catch (err) {
    console.log(err);
    response.badRequest({ data: err });
  }
};

exports.updateValidator = async (req, res, next) => {
  const response = new Res(res);
  try {
    const reqData = req.body;
    const reqName = reqData.name.toUpperCase();
    const reqSymbol = reqData.symbol;
    // check currency name is exist() ?
    const currencyByName = await currencyMethodModel.findOne({ name: reqName });
    if (currencyByName && currencyByName._id.toString() !== req.params.id) {
      return response.badRequest({
        msg: `name '${reqName}' aleady exist`,
      });
    }
    // check currency symbol is exist() ?
    const currencyBySymbol = await currencyMethodModel.findOne({
      symbol: reqSymbol,
    });
    if (currencyBySymbol && currencyBySymbol._id.toString() !== req.params.id) {
      return response.badRequest({
        msg: `name '${reqSymbol}' aleady exist`,
      });
    }
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      symbol: Joi.string().min(1).max(1).required(),
    });
    await schema.validateAsync(reqData);
    next();
  } catch (err) {
    console.log(err);
    response.badRequest({ data: err });
  }
};
