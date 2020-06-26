import Res from "./response_controller";
const config = require("./../configs/constant");

const customerModel = require("../models/customerModel");

// get all order
exports.getCustomers = async (req, res) => {
  const response = new Res(res);
  try {
    const foundCustomer = await customerModel.find();
    if (foundCustomer.length > 0) {
      response.success({ data: foundCustomer });
    } else {
      response.success({ data: foundCustomer, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
