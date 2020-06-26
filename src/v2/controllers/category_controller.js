// Files Import Models,Controller ...
const Helpers = require("../helpers/Global");
const QB = require("../helpers/query_builder");
const FileProvider = require("../providers/file_provider");
const ResCtl = require("./response_controller");
const Category = require("../models/category");
const CatProvider = require("../providers/category_provider");
const constant = require("../configs/constant");

// save category
export async function saveCategory(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    const isValid = CatProvider.validateSaveData(req);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }
    // name check
    const isName = await Category.findOne({ name: req.body.name });
    if (isName !== null) {
      return response.badRequest({ msg: "Name is already exist" });
    }

    const isUpload = FileProvider.uploadImage({
      req: req,
      path: constant.imgPath.category,
      file: req.files.img,
    });
    if (!isUpload.status) return response.badRequest(isUpload);

    // cal save function from provider
    const isSave = await Category.create(req.body);
    if (!isSave) return response.badRequest({ msg: "can not add" });
    return response.success({ data: isSave });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update category
export async function updateCategory(req, res) {
  // define response
  const response = new ResCtl(res);
  var removeImgPath = null;
  try {
    // Check if auth is not super admin
    if (!req.is_super_admin)
      return response.notAllowed({ msg: "access denied" });

    const cat_id = req.params.cat_id;

    // cal save function from provider
    if (!Helpers.validateObjectId(cat_id) || !req.body.name) {
      return response.badRequest({ msg: "invalid request" });
    }

    const isCatID = await QB.isIdExist(Category, cat_id);
    if (isCatID == null) {
      return response.notFound({ msg: "Id is not exist" });
    }
    // name check
    const isName = await Category.findOne({ name: req.body.name });
    if (isName !== null && isName.name !== isCatID.name) {
      return response.badRequest({ msg: "Name is already exist" });
    }

    // save data
    isCatID.name = req.body.name;

    if (req.files) {
      if (!req.files.img) {
        return response.badRequest({ msg: "img is required" });
      }
      // remove file
      removeImgPath = isCatID.img;

      const isUpload = FileProvider.uploadImage({
        req: req,
        path: constant.imgPath.category,
        file: req.files.img,
      });
      isCatID.img = req.body.img;
      if (!isUpload.status) return response.badRequest(isUpload);
    }

    if (isCatID.save()) {
      if (removeImgPath !== null) {
        FileProvider.removeFileMany({
          path: constant.imgPath.category,
          fileName: removeImgPath,
        });
      }
      return response.success({ data: "updated" });
    }
    return response.badRequest({ msg: "can not update" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get all category
export async function getAllCategory(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    const populate = {
      path: "parent_id",
    };
    const catData = await QB.fetch({
      model: Category,
      adminType: req.is_super_admin,
      populate: populate,
    });
    return response.success(catData);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get child category
export async function getChildCategory(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    const catData = await Category.find({ parent_id: req.params.parent_id });
    return response.success({ data: catData });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get category
export async function getCategory(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    const populate = {
      path: "parent_id",
    };
    const catData = await QB.fetch({
      model: Category,
      adminType: req.is_super_admin,
      id: req.params.cat_id,
      populate: populate,
    });
    return response.success(catData);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete category
export async function deleteCategory(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    const isSet = await QB.setActive(
      Category,
      req.params.cat_id,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
