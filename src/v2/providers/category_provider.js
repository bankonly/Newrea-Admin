import Res from "../controllers/default_res_controller";

/** Models */
import { Category } from "../models/category";

/** Providers */
import { imageUpload } from "./file_provider";

/** helpers */
import { isString } from "../helpers/Global";
import { isIdExist, deleteOne } from "../helpers/query_builder";
import { validateObjectId } from "../helpers/Global";

/** validate save data */
export const validateSaveData = (obj) => {
  var error = {};
  var msg = "field is required";
  if (!obj.name) error.name = msg;
  return error;
};

/** save category */
export const _saveCategory = async (saveData) => {
  try {
    /** name check */
    const isName = await Category.findOne({ name: saveData.name });
    if (isName !== null) {
      return Res.badRequest({ msg: "Name is already exist" });
    }

    /** save data */
    const isSave = await Category.create(saveData);

    if (isSave) return Res.success({ data: "created" });
    return Res.badRequest({ msg: "can not create" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};

/** update category */
export const _updateCategory = async (cat_id, updateData) => {
  try {
    if (!validateObjectId(cat_id)) {
      return Res.badRequest({ msg: "invalid cat_id id" });
    }
    const isCatID = await isIdExist(Category, cat_id);
    if (isCatID == null) {
      return Res.notFound({ msg: "Id is not exist" });
    }
    /** name check */
    const isName = await Category.findOne({ name: updateData.name });
    if (isName !== null && isName.name !== isCatID.name) {
      return Res.badRequest({ msg: "Name is already exist" });
    }

    /** save data */
    isCatID.img = updateData.img;
    isCatID.name = updateData.name;

    if (await isCatID.save()) return Res.success({ data: "updated" });
    return Res.badRequest({ msg: "can not update" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};

// /** get category */
export const _getCategory = async (cat_id = null) => {
  try {
    var catData = null;
    if (cat_id !== null) {
      if (!validateObjectId(cat_id)) {
        return Res.badRequest({ msg: "invalid cat_id id" });
      }
      catData = Category.findOne({
        _id: cat_id,
        parent_id: null,
      });
    } else {
      catData = Category.find({ parent_id: null });
    }

    const respCategory = await catData.select("-__v");

    /** check if accData no data */
    if (respCategory == null || respCategory.length < 1) {
      return Res.notFound({ msg: "no category data data" });
    }

    return Res.success({ data: respCategory });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};

// /** delete category */
export const _deleteCategory = async (cat_id) => {
  try {
    if (!validateObjectId(cat_id)) {
      return Res.badRequest({ msg: "invalid cat_id id" });
    }

    const delCat = await deleteOne(Category, cat_id);
    if (!delCat) {
      return Res.badRequest({ msg: "can not delete or id not exist" });
    }
    return Res.success({ msg: "deleted" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};
