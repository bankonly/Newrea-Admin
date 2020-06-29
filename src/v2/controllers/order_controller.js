import Res from "./response_controller";
const config = require("./../configs/constant");

const orderModel = require("../models/orderModel");

// get all order
exports.getOrders = async (req, res) => {
  const response = new Res(res);
  try {
    const foundOrder = await orderModel.findOne().populate([
      {
        path: "cus_id",
      },
      {
        path: "address_id",
      },
      {
        path: "currency_id",
      },
      {
        path: "delivery_fee_id",
      },
      {
        path: "payment_method_id",
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
