const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const password = require("secure-random-password");
const sellerModel = require("../../models/seller");
const categoryModel = require("../../models/category");
const deliveryFeeOptionModel = require("../../models/delivery_fee_option");
import Res from "../../controllers/response_controller";

exports.createValidator = async (req, res, next) => {
  const response = new Res(res);
  const data = req.body;
  data.pass = randomPassword();

  // check valid ObjectId
  // check delivery fee option id is monogoose ObjectId?
  if (!mongoose.Types.ObjectId.isValid(data.delivery_fee_option_id)) {
    return response.badRequest({
      msg: `ObjectId '${data.delivery_fee_option_id}' is not valid`,
    });
  }

  // check delivery_fee_option id is exist in database?
  if (!(await deliveryFeeOptionModel.findById(data.delivery_fee_option_id))) {
    return response.badRequest({
      msg: `delivery fee option id: '${data.delivery_fee_option_id}'  not exist`,
    });
  }
  // check validator categorys is exist in database?
  //   get all category id lavel1
  const categorysID = await categoryModel
    .find({ parent_id: null })
    .select("_id");
  // check category is exist?
  let notValidCategory = [];
  data.category_id.map((e) => {
    if (!categorysID.includes(e)) {
      notValidCategory.push(e);
    }
  });
  if (notValidCategory.length > 0) {
    return response.badRequest({
      data: notValidCategory,
      msg: `categories not valid`,
    });
  }

  // validate user_name is unique?
  const reqUserName = data.user_name.toLowerCase();
  const sellerUserName = await sellerModel.findOne({
    user_name: reqUserName,
  });
  if (sellerUserName) {
    return response.badRequest({
      msg: `user name '${reqUserName}' aleady exist`,
    });
  }

  const schema = Joi.object({
    category_id: Joi.array().min(1),
    user_name: Joi.string().min(3).required(),
    name: Joi.string().min(2).required(),
    pass: Joi.string().min(4).required(),
    phone: Joi.string().min(8).max(10).required(),
    location: Joi.array()
      .max(1)
      .items(
        Joi.object({
          latitude: Joi.string(),
          longitude: Joi.string(),
        })
      ),
    address: Joi.string().min(5).max(200).allow(""),
    is_active: Joi.string().valid("active", "inActive").required(),
    delivery_fee_option_id: Joi.string().required(),
    com: Joi.number().min(0).max(100).required(),
    is_online: Joi.string().allow(""),
  });
  try {
    await schema.validateAsync(data);
    next();
  } catch (err) {
    return response.badRequest({ data: err });
  }
};
exports.checkValidObjectId = (req, res, next) => {
  const response = new Res(res);
  const key = Object.keys(req.params)[0];
  if (!mongoose.Types.ObjectId.isValid(req.params[key])) {
    return response.badRequest({
      msg: `ObjectId ${req.params[key]} is not valid`,
    });
  }
  next();
};

function randomPassword() {
  return password.randomPassword({
    characters: [password.lower, { characters: password.digits, exactly: 4 }],
    length: 8,
  });
}
