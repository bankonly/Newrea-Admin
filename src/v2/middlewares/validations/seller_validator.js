const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const sellerModel = require("../../models/seller");
const categoryModel = require("../../models/category");
const deliveryFeeOptionModel = require("../../models/delivery_fee_option");
import Res from "../../controllers/response_controller";

exports.createValidator = async (req, res, next) => {
  const response = new Res(res);
  const data = req.body;
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
    name: Joi.string().min(2).max(50).required(),
    percen: Joi.number().positive().required(),
    is_active: Joi.string().valid("active", "inActive").required(),
  });
  try {
    await schema.validateAsync(data);
    next();
  } catch (err) {
    // console.log(err);
    response.badRequest({ data: err });
  }
};
