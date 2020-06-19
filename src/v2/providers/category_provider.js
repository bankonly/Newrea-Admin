import Res from "../controllers/default_res_controller";

/** Models */
import { Category, CategoryQB } from "../models/category";

/** Providers */
import { imageUpload } from "./file_provider"

/** validate save data */
export const validateSaveData = (obj) => {
  var error = {};
  var msg = "field is required";
  if (!obj.name) error.name = msg;
  return error;
};

/** save category */
export const _saveCategory = (req,res,saveData) => {
  try {
    return Res.success({ data: null });
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
    return Res.success({ data: null });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};
