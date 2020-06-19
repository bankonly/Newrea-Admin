import Res from "../controllers/default_res_controller";

/** Models */
import { Category, CategoryQB } from "../models/category";

/** Providers */
import { imageUpload } from "./file_provider";
import { isString } from "../helpers/Global";

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
    const isName = await CategoryQB.findByName(saveData.name);
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
export const _updateCategory = () => {
  try {
    return Res.success({ data: null });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};

/** get category */
export const _getCategory = (cat_id = null) => {
  try {
    return Res.success({ data: null });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};

/** delete category */
export const _deleteCategory = () => {
  try {
    // /** Check if auth is not super admin */
    // if (!authAccessPolicy) return Res.notAllowed({ msg: "access denied" });

    // if (!validateObjectId(accp_id)) {
    //   return Res.badRequest({ msg: "invalid access policy id" });
    // }
    return Res.success({ data: null });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};

