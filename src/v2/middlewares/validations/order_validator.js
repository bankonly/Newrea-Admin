const Joi = require("@hapi/joi");
const pickupFromSellerModel = require("../../models/pickupFromSellerModel");
const driverModel = require("../../models/driverModel");
const productItemModel = require("../../models/Product_item");
import Res from "../../controllers/response_controller";

exports.asignValidator = async (req, res, next) => {
  const response = new Res(res);
  const reqData = req.body;
  try {
    // check driver
    const foundDriver = await driverModel.findById(req.body.driver_id);
    if (!foundDriver) {
      return response.badRequest({
        data: foundDriver,
        msg: `Driver id '${req.body.driver_id}' not found in database`,
      });
    } else if (
      foundDriver.is_active !== "active" ||
      foundDriver.dri_status !== true
    ) {
      return response.badRequest({
        data: driverModel,
        msg: "This driver is not ready",
      });
    }
    // check product_item ID
    const orderStatusReadyToAsign = "confirmed from seller";
    const foundProductItem = await productItemModel
      .findById(reqData.product_item_id)
      .populate({
        path: "order_status_id",
        select: "name",
      })
      .select("order_status_id");
    // return res.json(foundProductItem);
    if (foundProductItem) {
      req.body.order_status_id = foundProductItem.order_status_id._id; // set req body
      if (foundProductItem.order_status_id.name !== orderStatusReadyToAsign) {
        return response.badRequest({
          data: foundProductItem,
          msg: `This order status is not available to assign to a driver (order status must be '${orderStatusReadyToAsign}')`,
        });
      }
    } else {
      return response.notFound({
        data: foundProductItem,
        msg: `product_item_id '${reqData.product_item_id}' not found`,
      });
    }
    // make sure order is not assigned yet
    const foundPickupFromseller = await pickupFromSellerModel
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
      .populate("driver_id");
    if (foundPickupFromseller) {
      return response.badRequest({
        data: foundPickupFromseller,
        msg: `This order already assign to driver name '${foundPickupFromseller.driver_id.first_name}'`,
      });
    }
    req.body.admin_id = req.auth._id.toString(); // set admin_id from auth
    const schema = Joi.object({
      product_item_id: Joi.string().required(),
      driver_id: Joi.string().required(),
      order_status_id: Joi.string().required(),
      admin_id: Joi.string().required(),
    });
    await schema.validateAsync(reqData);
    next();
  } catch (err) {
    console.log(err);
    return response.somethingWrong({ error: err });
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
