const Res = require("../controllers/default_res_controller");

// Helpers
const Helpers = require("../helpers/Global");

// Models
const AccessPolicy = require("../models/access_policy");

// validate create data
export function validateCreateData(obj) {
  var error = {};
  if (!Helpers.isValidObj(obj)) return (error.obj = "invalid object");
  if (!Helpers.isBoolean(obj.is_super_admin)) {
    error.is_super_admin = "field is required as boolean";
  }
  if (!obj.name) error.name = "field is required";
  if (!Helpers.isEmptyObj(error)) return error;

  const validObj = Helpers.multipleValidateObj(
    obj,
    ["is_super_admin", "name"],
    "number",
    {}
  );
  if (validObj.length > 0) error = validObj;
  return validObj;
}

// Create new access policy
export async function create(accessPolicyData, authAccessPolicy) {
  try {
    // Check if auth is not super admin
    if (!authAccessPolicy) return Res.notAllowed({ msg: "access denied" });

    if (!Helpers.isValidObj(accessPolicyData)) {
      return Res.badRequest({ data: "invalid object" });
    }

    // check name
    const isName = await AccessPolicy.findOne({ name: accessPolicyData.name });
    if (isName !== null) return Res.duplicated({ msg: "name already exist" });

    // create access policy
    const createAccess = await AccessPolicy.create(accessPolicyData);
    return Res.success({ data: createAccess });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// get access policy
export async function fetch(accp_id = null) {
  try {
    var accData = null;
    if (accp_id !== null) {
      accData = await AccessPolicy.findOne({
        _id: accp_id,
      }).select("-__v");
    } else {
      accData = await AccessPolicy.find().select("-__v");
    }

    // check if accData no data
    if (accData == null || accData.length < 1) {
      return Res.notFound({ msg: "no access policy data" });
    }

    return Res.success({ data: accData });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// update access policy
export async function update(
  { updateData, authAccessPolicy },
  accp_id
) {
  try {
    // Check if auth is not super admin
    if (!authAccessPolicy) return Res.notAllowed({ msg: "access denied" });

    if (!Helpers.isValidObj(updateData)) {
      return Res.badRequest({ data: "invalid object" });
    }

    // check accp_id
    if (!Helpers.validateObjectId(accp_id)) {
      return Res.badRequest({ msg: "invalid access policy id" });
    }

    // // check if access policy exist
    const isAccess = await AccessPolicy.findById(accp_id);
    if (isAccess == null) {
      return Res.notFound({ msg: "access policy id not found" });
    }

    // check name
    const isName = await AccessPolicy.findOne({ name: updateData.name });
    if (isName !== null && isName.name !== isAccess.name)
      return Res.duplicated({ msg: "name already exist" });

    // update access policy
    const isUpdate = await AccessPolicy.updateOne(
      {
        _id: accp_id,
      },
      { $set: updateData }
    );

    if (!isAccess.save()) return Res.badRequest({ msg: "can not update" });
    return Res.success({ msg: "updated" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}
