import Res from "./response_controller";
const config = require("./../configs/constant");

const orderModel = require("../models/orderModel");

// get all order
exports.getOrders = async (req, res) => {
  const response = new Res(res);
  try {
    const foundOrder = await orderModel
      .find()
      .populate([
        "cus_id",
        "address_id",
        "currency_id",
        "delivery_fee_id",
        "payment_method_id",
      ]);
    if (foundOrder.length > 0) {
      response.success({ data: foundOrder });
    } else {
      response.success({ data: foundOrder, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
