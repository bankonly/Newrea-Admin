import { mode } from "crypto-js";
const Helpers = require("./Global");
const response = require("../providers/response_provider");

export async function updateOne(model, id, updateData) {
  const isId = await model.findById(id);
  if (!isId) {
    return response.notFound({ msg: "no data" });
  }

  const isUpdate = await model.updateOne({ _id: id }, { $set: updateData });
  if (isUpdate) {
    return response.success({ msg: "updated", data: isId });
  }
  return response.badRequest({ msg: "cannot update" });
}

export function deleteOne(model, id) {
  return model.findByIdAndDelete(id);
}

export function get(model, id) {
  return model.findById(id);
}

export function isIdActive(model, id, is_active = "active") {
  return model.findOne({
    _id: id,
    is_active: is_active,
  });
}

export function getData(model, id = null, many = false) {
  if (id == null) {
    return model.find();
  } else {
    if (many) {
      return model.find({ _id: id });
    }
    return model.findOne({ _id: id });
  }
}

export function deleteIsActive(model, id, is_active = "inactive") {
  return model.updateOne({ _id: id }, { $set: { is_active: is_active } });
}

export async function fetch({
  model,
  id = null,
  adminType = false,
  populate = null,
  condition = {},
  select = null,
}) {
  try {
    var data = null;

    if (!adminType) {
      condition.is_active = "active";
    }

    if (id !== null) {
      if (!Helpers.validateObjectId(id)) {
        return response.badRequest({ msg: "invalid id" });
      }
      if (!Helpers.isEmpty(condition)) {
        condition._id = id;
      }
      data = model.findOne(condition).select(select);
    } else {
      data = model.find(condition).select(select);
    }

    if (populate !== null) {
      data = data.populate(populate);
    }

    const resData = await data;

    if (resData == null || resData.length < 1) {
      return response.notFound({ msg: "no data" });
    }

    return response.success({ data: resData });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// validate is active
export function isValidActive(is_active) {
  var error = {};
  if (!Helpers.isEmpty(is_active)) error.is_active = "is required";
  else if (is_active !== "active" && is_active !== "inactive") {
    error.is_active = "allow only active and inactive";
  }

  return error;
}

export async function setActive(model, id, is_active) {
  try {
    if (!Helpers.invalidObjectId(id)) {
      return response.badRequest({ msg: "invalid id" });
    }

    const isId = await isIdExist(model, id);
    if (!isId) {
      return response.notFound({ msg: "no data" });
    }
    const isValid = isValidActive(is_active);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    isId.is_active = is_active;

    if (isId.save()) {
      return response.success({ msg: "set to " + is_active });
    }
    return response.success({ msg: "cannot set data" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
