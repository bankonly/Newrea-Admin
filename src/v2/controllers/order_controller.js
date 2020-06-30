import Res from "./response_controller";
const config = require("./../configs/constant");

const orderModel = require("../models/orderModel");
const orderStatusModel = require("../models/orderStatusModel");
const productItemModel = require("../models/Product_item");
const pickupFromSellerModel = require("../models/pickupFromSellerModel");

// get all order
exports.getOrders = async (req, res) => {
  const response = new Res(res);
  try {
    const foundOrder = await productItemModel.find().populate([
      {
        path: "order_id",
        populate: [
          {
            path: "cus_id",
            select:
              "name email phone profile_img customer_fb_id customer_google_id isConfirmed",
          },
          {
            path: "address_id",
          },
          {
            path: "currency_id",
            select: "name symbol",
          },
          {
            path: "delivery_fee_id",
          },
          {
            path: "delivery_type_id",
            select: "name price time",
          },
          {
            path: "payment_method_id",
            select: "name",
          },
        ],
      },
      {
        path: "order_status_id",
        select: "name",
      },
      {
        path: "items.seller_id",
        select: "name",
      },
      {
        path: "items.order_status_id",
        select: "name",
      },
      {
        path: "items.option.product_seller_id",
        select: "name",
      },
    ]);
    if (foundOrder.length > 0) {
      return response.success({ data: foundOrder });
    } else {
      return response.success({ data: foundOrder, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

// get asgined orders
exports.getAsignedOrders = async (req, res) => {
  const response = new Res(res);
  try {
    const foundOrder = await pickupFromSellerModel.find().populate([
      {
        path: "driver_id",
      },
      {
        path: "admin_id",
      },
      {
        path: "order_status_id",
      },
      {
        path: "cancel_reason_id",
      },
    ]);
    if (foundOrder.length > 0) {
      return response.success({ data: foundOrder });
    } else {
      return response.success({ data: foundOrder, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

// get asgined orders
exports.asigneToDriver = async (req, res) => {
  const response = new Res(res);
  try {
    const newData = new pickupFromSellerModel(req.body);
    const savedData = await newData.save();
    if (savedData) {
      return response.success({ data: savedData });
    } else {
      return response.success({ data: savedData, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
