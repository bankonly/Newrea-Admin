/** Modules */

import ResCtl from "./response_controller";

/** Helpers */
import {
  isString,
  isEmptyObj,
  validateObjectId,
  isEmpty,
} from "../helpers/Global";
import { isIdExist, deleteIsActive } from "../helpers/query_builder";

/** Models */
import { MostPopular } from "../models/most_popular";

/** Providers */
import { uploadImage, removeImage } from "../providers/file_provider";
import {
  validateSaveData,
  _getMostPopular,
} from "../providers/most_popular_provider";

/** Configs */
import constant from "../configs/constant";

/** save most popular */
export const saveMostPopular = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  var errorImg = null;
  try {
    /** create new data */
    const isValid = validateSaveData(req);
    if (!isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    /** validate image and body data */
    const isUpload = uploadImage({
      path: constant.imgPath.most_popular,
      file: req.files.img,
      req: req,
    });

    if (!isUpload.status) return response.badRequest(isUpload);

    const isCreate = await MostPopular.create(req.body);
    if (!isCreate) return response.badRequest({ msg: "can not create" });
    return response.success({ data: isCreate });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** update most popular */
export const updateMostPopular = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  var errorImg = null;
  try {
    if (!validateObjectId(req.params.mos_id)) {
      return response.badRequest({ msg: "invalid most popular id" });
    }

    const isValid = await validateSaveData(req, false);
    if (!isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    const isId = await isIdExist(MostPopular, req.params.mos_id);
    if (isId == null) return response.notFound({ msg: "id not exist" });

    /** validate image and body data */
    if (req.files) {
      if (!req.files.img) {
        return response.badRequest({ msg: "img param is required" });
      }
      const isUpload = uploadImage({
        path: constant.imgPath.most_popular,
        file: req.files.img,
        req: req,
      });

      if (!isUpload.status) return response.badRequest(isUpload);
    }
    /** create new data */
    const isUpdate = await MostPopular.updateOne(
      { _id: req.params.mos_id },
      { $set: req.body }
    );
    if (!isUpdate) return response.badRequest({ msg: "can not update" });
    return response.success({ msg: "updated" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get all most popular */
export const getAllMostPopular = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    const most_data = await _getMostPopular(null, req.is_super_admin);
    return response.success(most_data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get most popular */
export const getMostPopular = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    const mos_id = req.params.mos_id;
    if (!isEmpty(mos_id)) {
      return response.badRequest({ msg: "mos_id is required" });
    }

    const most_data = await _getMostPopular(mos_id, req.is_super_admin);
    return response.success(most_data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** delete most popular */
export const deleteMostPopular = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    /** Check if auth is not super admin */
    if (!req.is_super_admin) {
      return response.notAllowed({ msg: "access denied" });
    }

    const mos_id = req.params.mos_id;
    if (!isEmpty(mos_id) || !validateObjectId(mos_id)) {
      return response.badRequest({ msg: "mos_id is required " });
    }

    const isId = await isIdExist(MostPopular, mos_id);
    if (!isId || isId.is_active == "in_active") {
      return response.notFound({ msg: "no data" });
    }

    const delAcc = await deleteIsActive(MostPopular, mos_id);
    if (!delAcc) {
      return response.badRequest({ msg: "can not delete or id not exist" });
    }
    return response.success({ msg: "deleted" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};
