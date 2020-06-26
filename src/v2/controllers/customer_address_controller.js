import Res from "./response_controller";
const config = require("./../configs/constant");

const CustomerAddressModel = require("../models/CustomerAddressModel");

// get all order
exports.getCustomerAddress = async (req, res) => {
  const response = new Res(res);
  try {
    const foundCustomerAddress = await CustomerAddressModel.find();
    if (foundCustomerAddress.length > 0) {
      response.success({ data: foundCustomerAddress });
    } else {
      response.success({ data: foundCustomerAddress, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
