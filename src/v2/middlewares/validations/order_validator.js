const Joi = require("@hapi/joi");
const pickupFromSellerModel = require("../../models/pickupFromSellerModel");
import Res from "../../controllers/response_controller";

exports.asignValidator = async (req, res, next) => {
  const response = new Res(res);
  const reqData = req.body;
  try {
    if (
      await pickupFromSellerModel
        .findOne({
          $and: [
            {
              product_item_id: reqData.product_item_id,
            },
            {
              cancel_reason_id: null,
            },
          ],
        })
        .populate("driver_id")
    ) {
      return response.badRequest({
        msg: `This order alerady asign to driver ${pickupFromSellerModel.driver_id.first_name}`,
      });
    }
    req.body.admin_id = req.auth._id; // set admin_id  from auth ID
    const schema = Joi.object({
      product_item_id: Joi.string().required(),
      driver_id: Joi.string().required(),
      order_status_id: Joi.string().required(),
      admin_id: Joi.string().required(),
    });
    await schema.validateAsync(reqData);
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
