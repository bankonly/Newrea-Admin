import { mode } from "crypto-js";

const Helpers = require("./Global");

const Res = require("../controllers/default_res_controller");

export async function updateOne(model, id, updateData) {
  const isId = await model.findById(id);
  if (!isId) {
    return Res.notFound({ msg: "no data" });
  }

  const isUpdate = await model.updateOne({ _id: id }, { $set: updateData });
  if (isUpdate) {
    return Res.success({ msg: "updated", data: isId });
  }
  return Res.badRequest({ msg: "cannot update" });
}

export function deleteOne(model, id) {
  return model.findByIdAndDelete(id);
}

export function isIdExist(model, id) {
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

export function deleteIsActive(model, id, is_active = "in_active") {
  return model.updateOne({ _id: id }, { $set: { is_active: is_active } });
}

export async function fetch({ model, id = null, adminType = false }) {
  try {
    var data = null;
    var condition = {};

    if (!adminType) {
      condition.is_active = "active";
    }

    if (id !== null) {
      if (!Helpers.validateObjectId(id)) {
        return Res.badRequest({ msg: "invalid id" });
      }
      condition._id = id;
      data = model.findOne(condition);
    } else {
      data = model.find(condition);
    }

    const resData = await data.select("-__v");

    if (resData == null || resData.length < 1) {
      return Res.notFound({ msg: "no data" });
    }

    return Res.success({ data: resData });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// validate is active
export function isValidActive(is_active) {
  var error = {};
  if (!Helpers.isEmpty(is_active)) error.is_active = "is required";
  else if (is_active !== "active" && is_active !== "in_active") {
    error.is_active = "allow only active and in_active";
  }

  return error;
}

export async function setActive(model, id, is_active) {
  try {
    if (!Helpers.invalidObjectId(id)) {
      return Res.badRequest({ msg: "invalid id" });
    }

    const isId = await isIdExist(model, id);
    if (!isId) {
      return Res.notFound({ msg: "no data" });
    }
    const isValid = isValidActive(is_active);
    if (!Helpers.isEmptyObj(isValid)) {
      return Res.badRequest({ data: isValid });
    }

    isId.is_active = is_active;

    if (isId.save()) {
      return Res.success({ msg: "set to " + is_active });
    }
    return Res.success({ msg: "cannot set data" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}
