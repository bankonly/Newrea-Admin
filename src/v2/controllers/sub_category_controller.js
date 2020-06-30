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
    // validate comming id
    const isValid = await SubCatProvider.validate(req);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    // validate object id and store save data
    const isValidId = await SubCatProvider.validateProductSeller(req, {});
    if (!isValidId.status) return response.badRequest(isValidId);

    const isUpload = File.uploadImage({
      path: constant.imgPath.categories,
      file: req.files.img,
      req,
    });

    if (!isUpload.status) return response.badRequest(isUpload);

    const { data } = isValidId;

    // store image file
    data.img = isUpload.data;

    // save
    const isCreate = await SubCategory.create(data);
    if (!isCreate) return response.badRequest({ msg: "failed to create" });
    const resData = await QB.fetch({
      model: SubCategory,
      id: isCreate._id.toString(),
      adminType: req.is_super_admin,
      populate: SubCatProvider.defaultPopulate,
    });
    return response.success(resData);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update most popular
export async function updateSubCategory(req, res) {
  // define response
  const response = new Res(res);
  try {
    // find id and validate
    if (!Helpers.validateObjectId(req.params.cats_id)) {
      return response.invalidObjectId({});
    }

    const isId = SubCategory.findById(req.params.cats_id);

    // get respoonse sub data
    const subData = await isId;
    if (!subData) return response.notFound({ msg: "id not found" });

    // validate comming id
    const isValid = await SubCatProvider.validate(req, false);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    // validate object id and store save data
    const isValidId = await SubCatProvider.validateProductSeller(req, {
      model: subData,
    });
    if (!isValidId.status) return response.render(isValidId);

    if (Helpers.isFile(req.files, "img")) {
      const isUpload = File.uploadImage({
        path: constant.imgPath.categories,
        file: req.files.img,
        req,
      });

      if (!isUpload.status) return response.render(isUpload);
      File.remove({
        path: constant.imgPath.categories,
        fileName: isId.img,
      });
      // store image file
      data.img = isUpload.data;
    }

    const { data } = isValidId;

    if (!(await data.save()))
      return response.badRequest({ msg: "failed to update" });
    const resData = await QB.fetch({
      model: SubCategory,
      id: req.params.cats_id,
      adminType: req.is_super_admin,
      populate: SubCatProvider.defaultPopulate,
    });
    return response.success(resData);
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
      model: SubCategory,
      adminType: req.is_super_admin,
      populate: SubCatProvider.defaultPopulate,
    });
    return response.success(data);
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
      model: SubCategory,
      adminType: req.is_super_admin,
      id: req.params.cats_id,
      populate: SubCatProvider.defaultPopulate,
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
      SubCategory,
      req.params.cats_id,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
