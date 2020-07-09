const Res = require("./response_controller");
const File = require("../providers/file_provider");
const Helpers = require("../helpers/Global");
const constant = require("../configs/constant");
const QB = require("../helpers/query_builder");
const Product = require("../models/Product_master").default;
const Customer = require("../models/customerModel");
const Seller = require("../models/seller");

export const dashboard = async (req, res) => {
  // define response
  const response = new Res(res);
  try {
      
    let respData = {};
    respData.total_products = await Product.count();
    respData.total_customers = await Customer.count();
    respData.total_sellers = await Seller.count();

    return response.success({ data: respData });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};
