import Res from "./response_controller";
const config = require("./../configs/constant");

const currencyModel = require("../models/CurrencyModel");

// get all order
exports.getCurrency = async (req, res) => {
  const response = new Res(res);
  try {
    const foundCurrency = await currencyModel;
    if (foundCurrency.length > 0) {
      response.success({ data: foundCurrency });
    } else {
      response.success({ data: foundCurrency, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
