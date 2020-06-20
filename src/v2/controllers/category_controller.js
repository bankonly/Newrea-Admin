/** Modules */

import ResCtl from "./response_controller";

/** Helpers */
import { isString, isEmptyObj } from "../helpers/Global";

/** Providers */
import { uploadImage, uploadImagev2 } from "../providers/file_provider";
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
    const isUpload = await uploadImage(
      {
        req: req,
        res: res,
        path: constant.imgPath.category,
        field: "image",
      },
      validateSaveData
    );

    if (!isUpload.status) return response.badRequest(isUpload);

    /** cal save function from provider */
    const isImageSave = await _saveCategory(isUpload.data);
    return response.success(isImageSave);
  } catch (error) {
    console.log(error);
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
    },validateSaveData);

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
    const catData = await _deleteCategory(req.params.cat_id);
    return response.success(catData);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};
