import Res from "./response_controller";
const config = require("./../configs/constant");
const firebaseAdmin = require("firebase-admin");

const orderModel = require("../models/orderModel");
const orderStatusModel = require("../models/orderStatusModel");
const productItemModel = require("../models/Product_item");
const pickupFromSellerModel = require("../models/pickupFromSellerModel");

// get all order
exports.getOrders = async (req, res) => {
  const response = new Res(res);
  try {
    const foundOrder = await productItemModel
      .find({ order_id: { $ne: null } })
      .sort({ field: "asc", created_date: -1 })
      .populate([
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
    const foundOrder = await pickupFromSellerModel
      .find({
        $and: [
          { order_status_id: "5e47955f155e132ea0625ca1" },
          { cancel_reason_id: null },
          { driver_id: { $ne: null } },
        ],
      })
      .sort({ field: "asc", created_date: -1 })
      .populate([
        {
          path: "product_item_id",
        },
        {
          path: "driver_id",
          // select: "first_name last_name phone_number",
        },
        {
          path: "admin_id",
          // select: "name",
        },
        {
          path: "order_status_id",
          // select: "name",
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
exports.getAllCancelFromDriver = async (req, res) => {
  const response = new Res(res);
  try {
    const foundOrder = await pickupFromSellerModel
      .find({ cancel_reason_id: { $ne: null } })
      .populate([
        {
          path: "product_item_id",
        },
        {
          path: "driver_id",
          // select: "first_name last_name phone_number",
        },
        {
          path: "admin_id",
          // select: "name",
        },
        {
          path: "order_status_id",
          // select: "name",
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
      // update order status after assign to driver
      //
      //
      //
      // push notification
      //
      //
      //
    } else {
      return response.somethingWrong({ data: savedData });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
