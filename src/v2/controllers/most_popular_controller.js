/** Modules */

const ResCtl = require("./response_controller");

/** Helpers */
const {
  isString,
  isEmptyObj,
  validateObjectId,
  isEmpty,
} = require("../helpers/Global");
const { isIdExist,deleteIsActive } = require("../helpers/query_builder");

/** Models */
const { MostPopular } = require("../models/most_popular");

/** Providers */
const { uploadImage, removeImage } = require("../providers/file_provider");
const {
  validateSaveData,
  _getMostPopular,
} = require("../providers/most_popular_provider");

/** Configs */
const constant = require("../configs/constant").default;

/** save most popular */
export const saveMostPopular = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  var errorImg = null;
  try {
    /** validate image and body data */
    const isUpload = await uploadImage({
      path: constant.imgPath.most_popular,
      field: "image",
      req: req,
      res: res,
    });

    if (!isUpload.status) return response.badRequest(isUpload);
    /** create new data */
    const isValid = await validateSaveData(req.body);
    if (!isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

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

    const isId = await isIdExist(MostPopular, req.params.mos_id);
    if (isId == null) return response.notFound({ msg: "id not exist" });

    /** validate image and body data */
    const isUpload = await uploadImage({
      path: constant.imgPath.most_popular,
      field: "image",
      req: req,
      res: res,
    });

    if (!isUpload.status) return response.badRequest(isUpload);

    const isValid = await validateSaveData(req.body);
    if (!isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
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
    const most_data = await _getMostPopular();
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

    const most_data = await _getMostPopular(mos_id);
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

    const delAcc = await deleteIsActive(MostPopular,mos_id);
    if (!delAcc) {
      return response.badRequest({ msg: "can not delete or id not exist" });
    }
    return response.success({ msg: "deleted" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};
