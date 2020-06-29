
const Res = require("./response_controller");
const FileProvider = require("../providers/file_provider");
const product_masterProvider = require("../providers/product_master_provider");
const Helpers = require("../helpers/Global");
const constant = require("../configs/constant");
const QB = require("../helpers/query_builder");
const Product_master = require("../models/Product_master").default;

// save
export async function saveproduct_master(req, res) {
  // define response
  const response = new Res(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update
export async function updateproduct_master(req, res) {
  // define response
  const response = new Res(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get all
export async function getAllproduct_master(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: Product_master,
      adminType: req.is_super_admin,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get
export async function getproduct_master(req, res) {
  // define response
  const response = new Res(res);
  try {
    // const data = await QB.fetch({
    //   model: Product_master,
    //   adminType: req.is_super_admin,
    //   id: req.params.{ param name },
    // });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete
export async function deleteproduct_master(req, res) {
  // define response
  const response = new Res(res);
  try {
    // const isSet = await QB.setActive(
    //   Product_master,
    //   req.params.{ param name },
    //   req.body.is_active
    // );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
