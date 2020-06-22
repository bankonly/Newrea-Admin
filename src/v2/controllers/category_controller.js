/** Modules */
import fs from "fs";
import ResCtl from "./response_controller";

/** Helpers */
import { isString, isEmptyObj, validateObjectId } from "../helpers/Global";
import { deleteIsActive } from "../helpers/query_builder"

/** Providers */
import {
  uploadImage,
  removeFileMany,
  uploadImageMany,
} from "../providers/file_provider";

/** Models */
import Category from "../models/category";

import {
  _saveCategory,
  validateSaveData,
  _updateCategory,
  _getCategory,
  _deleteCategory,
} from "../providers/category_provider";

/** Configs */
import constant from "../configs/constant";

/** save category */
export const saveCategory = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    const isUpload = await uploadImage({
      req: req,
      res: res,
      path: constant.imgPath.category,
      field: "image",
    });

    const isValid = await validateSaveData(req.body);
    if (!isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }
    if (!isUpload.status) return response.badRequest(isUpload);

    /** cal save function from provider */
    const isImageSave = await _saveCategory(req.body);
    return response.success(isImageSave);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** update category */
export const updateCategory = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    /** Check if auth is not super admin */
    if (!req.is_super_admin)
      return response.notAllowed({ msg: "access denied" });

    const isUpload = await uploadImage({
      req: req,
      res: res,
      path: constant.imgPath.category,
      field: "image",
    });

    if (!isUpload.status) return response.badRequest(isUpload);

    /** cal save function from provider */
    const isImageSave = await _updateCategory(req.params.cat_id, isUpload.data);
    return response.success(isImageSave);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get all category */
export const getAllCategory = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    const catData = await _getCategory();
    return response.success(catData);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get category */
export const getCategory = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    const catData = await _getCategory(req.params.cat_id);
    return response.success(catData);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** delete category */
export const deleteCategory = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    const isValid = validateObjectId(req.params.cat_id);

    /** Check validator */
    if (!isEmptyObj(isValid)) return response.badRequest({ data: isValid });

    const delAcc = await deleteIsActive(Category, req.params.cat_id);
    if (!delAcc) {
      return response.badRequest({ msg: "can not delete" });
    }
    return response.success({ msg: "deleted" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};
