import { array, object } from "@hapi/joi";

const Res = require("./response_controller");
const File = require("../providers/file_provider");
const SubCatProvider = require("../providers/sub_category_provider");
const Helpers = require("../helpers/Global");
const constant = require("../configs/constant");
const QB = require("../helpers/query_builder");
const SubCategory = require("../models/sub_category");

// save most popular
export async function saveSubCategory(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isValid = await SubCatProvider.validate(req);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    const isValidId = await SubCatProvider.validateProductSeller(req);
    if (!isValid.status) return response.badRequest(isValidId);

    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update most popular
export async function updateSubCategory(req, res) {
  // define response
  const response = new Res(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get all most popular
export async function getAllSubCategory(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: Banner,
      adminType: req.is_super_admin,
    });
    return response.success({ data });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get most popular
export async function getSubCategory(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: Banner,
      adminType: req.is_super_admin,
      id: req.params.banner_id,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete most popular
export async function deleteSubCategory(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isSet = await QB.setActive(
      Banner,
      req.params.banner_id,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
