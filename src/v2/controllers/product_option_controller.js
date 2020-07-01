
const Res = require("./response_controller");
const FileProvider = require("../providers/file_provider");
const product_optionProvider = require("../providers/product_option_provider");
const Helpers = require("../helpers/Global");
const constant = require("../configs/constant");
const QB = require("../helpers/query_builder");
const Product_option = require("../models/Product_option").default;

// save
export async function saveproduct_option(req, res) {
  // define response
  const response = new Res(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update
export async function updateproduct_option(req, res) {
  // define response
  const response = new Res(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get all
export async function getAllproduct_option(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: Product_option,
      adminType: req.is_super_admin,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get
export async function getproduct_option(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: Product_option,
      adminType: req.is_super_admin,
      id: req.params.product_option,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete
export async function deleteproduct_option(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isSet = await QB.setActive(
      Product_option,
      req.params.product_option,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
