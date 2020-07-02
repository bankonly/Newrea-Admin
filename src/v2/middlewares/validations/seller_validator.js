const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const password = require("secure-random-password");
const isValidCoordinates = require("is-valid-coordinates");

const sellerModel = require("../../models/seller");
const categoryModel = require("../../models/category");
const deliveryFeeOptionModel = require("../../models/delivery_fee_option");
import Res from "../../controllers/response_controller";

exports.createValidator = async (req, res, next) => {
  try {
    const response = new Res(res);
    const data = req.body;
    // convert category id
    if (typeof data.category_id === "string") {
      data.category_id = data.category_id.replace(/[\[\]"]/g, "").split(",");
    }
    // convert location to array object
    if (typeof data.location === "string") {
      let locationData = data.location.split(",");
      if (locationData.length !== 2) {
        return response.badRequest({
          msg: `location '${data.location}' is not valid`,
        });
      }
      data.location = [
        {
          latitude: locationData[0],
          longitude: locationData[1],
        },
      ];
    }
    // check valid latitude and longitude
    if (
      !isValidCoordinates(
        parseFloat(data.location[0].longitude),
        parseFloat(data.location[0].latitude)
      )
    ) {
      return response.badRequest({
        data: { test: parseFloat(data.location[0].latitude) },
        msg: "latitude and longitude not valid format",
      });
    }

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
    // convert object to array
    const categorysIDArray = categorysID.map((e) => e._id);
    // check categorys is exist?
    let notValidCategorys = [];
    data.category_id.map((e) => {
      if (!categorysIDArray.toString().includes(e)) {
        notValidCategorys.push(e);
      }
    });
    if (notValidCategorys.length > 0) {
      return response.badRequest({
        data: notValidCategorys,
        msg: `categories not valid`,
      });
    }

    // validate user_name is unique?
    const reqUserName = data.user_name.toLowerCase();
    const sellerUserName = await sellerModel.findOne({
      user_name: reqUserName,
    });
    if (sellerUserName) {
      if (req.method === "POST") {
        return response.badRequest({
          msg: `user name '${reqUserName}' aleady exist`,
        });
      }
      // for update seller
      else {
        if (sellerUserName._id.toString() !== req.params.sellerID.toString()) {
          return response.badRequest({
            msg: `user name '${reqUserName}' already exist`,
          });
        }
      }
    }
    let schema;
    if (req.method === "POST") {
      schema = Joi.object({
        category_id: Joi.array().min(1),
        user_name: Joi.string().min(3).required(),
        name: Joi.string().min(2).required(),
        pass: Joi.string().min(4).required(),
        phone: Joi.string().min(8).max(10).required(),
        location: Joi.array()
          .max(1)
          .items(
            Joi.object({
              latitude: Joi.string().min(5).required(),
              longitude: Joi.string().min(5).required(),
            })
          )
          .required(),
        address: Joi.string().min(5).max(200).allow(""),
        is_active: Joi.string().valid("active", "inactive").allow(""),
        delivery_fee_option_id: Joi.string().required(),
        com: Joi.number().min(0).max(100).required(),
        is_online: Joi.string().allow(""),
      });
    } else {
      schema = Joi.object({
        category_id: Joi.array().min(1),
        user_name: Joi.string().min(3).required(),
        name: Joi.string().min(2).required(),
        pass: Joi.string().min(4).required(),
        phone: Joi.string().min(8).max(10).required(),
        location: Joi.array()
          .max(1)
          .items(
            Joi.object({
              latitude: Joi.string().min(5).required(),
              longitude: Joi.string().min(5).required(),
            })
          ),
        address: Joi.string().min(5).max(200).allow(""),
        delivery_fee_option_id: Joi.string().required(),
        com: Joi.number().min(0).max(100).required(),
      });
    }
    await schema.validateAsync(data);
    next();
  } catch (err) {
    return response.badRequest({ data: err });
  }
};

function randomPassword() {
  return password.randomPassword({
    characters: [password.lower, { characters: password.digits, exactly: 4 }],
    length: 8,
  });
}
