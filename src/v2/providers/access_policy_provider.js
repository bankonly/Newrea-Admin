import Res from "../controllers/default_res_controller";

/** Helpers */
import {
  multipleValidateObj,
  isEmptyObj,
  isValidObj,
  isBoolean,
  isString,
  validateObjectId,
  invalidObjectId,
} from "../helpers/Global";

/** Models */
import AccessPolicy from "../models/access_policy";

/** validate create data */
export const validateCreateData = (obj) => {
  var error = {};
  if (!isValidObj(obj)) return (error.obj = "invalid object");
  if (!isBoolean(obj.is_super_admin)) {
    error.is_super_admin = "field is required as boolean";
  }
  if (!obj.name) error.name = "field is required";
  if (!isEmptyObj(error)) return error;

  const validObj = multipleValidateObj(
    obj,
    ["is_super_admin", "name"],
    "number",
    {}
  );
  if (validObj.length > 0) error = validObj;
  return validObj;
};

/** Create new access policy */
export const newAccessPolicy = async (accessPolicyData, authAccessPolicy) => {
  try {
    /** Check if auth is not super admin */
    if (!authAccessPolicy) return Res.notAllowed({ msg: "access denied" });

    if (!isValidObj(accessPolicyData)) {
      return Res.badRequest({ data: "invalid object" });
    }

    /** check name */
    const isName = await AccessPolicy.findOne({ name: accessPolicyData.name });
    if (isName !== null) return Res.duplicated({ msg: "name already exist" });

    /** create access policy */
    const createAccess = await AccessPolicy.create(accessPolicyData);
    return Res.success({ data: createAccess });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};

/** get access policy */
export const _getAccessPolicy = async (accp_id = null) => {
  try {
    var accData = null;
    if (accp_id !== null) {
      accData = await AccessPolicy.findOne({
        _id: accp_id,
      }).select("-__v");
    } else {
      accData = await AccessPolicy.find().select("-__v");
    }

    /** check if accData no data */
    if (accData == null || accData.length < 1) {
      return Res.notFound({ msg: "no access policy data" });
    }

    return Res.success({ data: accData });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};

/** update access policy */
export const _updateAccessPolicy = async (
  { updateData, authAccessPolicy },
  accp_id
) => {
  try {
    /** Check if auth is not super admin */
    if (!authAccessPolicy) return Res.notAllowed({ msg: "access denied" });

    if (!isValidObj(updateData)) {
      return Res.badRequest({ data: "invalid object" });
    }

    /** check accp_id */
    if (!validateObjectId(accp_id)) {
      return Res.badRequest({ msg: "invalid access policy id" });
    }

    // /** check if access policy exist */
    const isAccess = await AccessPolicy.findById(accp_id);
    if (isAccess == null) {
      return Res.notFound({ msg: "access policy id not found" });
    }

    /** check name */
    const isName = await AccessPolicy.findOne({ name: updateData.name });
    if (isName !== null && isName.name !== isAccess.name)
      return Res.duplicated({ msg: "name already exist" });

    /** update access policy */
    isAccess.img = updateData.img;
    isAccess.name = updateData.name;

    if (!isAccess.save()) return Res.badRequest({ msg: "can not update" });
    return Res.success({ msg: "updated" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};

/** delete access policy */
export const _deleteAccessPolicy = async (accp_id, authAccessPolicy) => {
  try {
    /** Check if auth is not super admin */
    if (!authAccessPolicy) return Res.notAllowed({ msg: "access denied" });

    if (!validateObjectId(accp_id)) {
      return Res.badRequest({ msg: "invalid access policy id" });
    }

    const delAcc = await AccessPolicy.findByIdAndDelete(accp_id);
    if (!delAcc)
      return Res.badRequest({ msg: "can not delete or id not exist" });
    return Res.success({ msg: "deleted" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};
