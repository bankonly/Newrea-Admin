import { Types } from "mongoose";
export function invalidObjectId(id) {
  return Types.ObjectId.isValid(id);
}

export function isEmptyObj(obj) {
  if (Object.keys(obj).length === 0) return true;
  return false;
}

// validate delete userId
export function validateObjectId(objectId) {
  if (!objectId || typeof objectId !== "string" || !invalidObjectId(objectId)) {
    return false;
  }
  return true;
}

//check valid object
export function isValidObj(obj) {
  if (typeof obj !== "object") return false;
  return true;
}

// Boolean validate
export function isBoolean(value) {
  if (typeof value !== "boolean") return false;
  return true;
}

// String validate
export function isString(value) {
  if (value == null || !value) return false;
  if (typeof value !== "string") return false;
  return true;
}

// validate
export function isEmpty(value, method = "string") {
  if (value == null || !value) return true;
  if (typeof value !== method) return true;
  return false;
}

// is array
export function isArray(value) {
  return Array.isArray(value) ? true : false;
}

// is valid date
export function isDate(date) {
  date = new Date(date);
  return date instanceof Date && !isNaN(date);
}

// is file
export function isFile(files, field = "img") {
  if (!files) return false;
  if (!files[field]) return false;
  return true;
}

export function getTimeFromDate(date) {
  const dt = new Date(date);
  return dt.getTime();
}

export function compareBtwDate(start_date, end_date) {
  const start = getTimeFromDate(start_date);
  const end = getTimeFromDate(end_date);
  if (end < start) return false;
  return true;
}

export const getDate = () => {
  return Date.now();
};

export const removeDucplicateArray = (arr) => {
  return data.filter((v, i) => data.indexOf(v) === i);
};

export const msg = {
  requried: (field, method = "string") => {
    return `:${field} field is required as ${method}`;
  },
  duplicated: (field) => `${field} is already exist`,
  notMatch: "password not match",
  pwd_notMatch_old: "password not match with old password",
  save: (isSave = true) => {
    let msg_alert = "success";
    if (!isSave) {
      msg_alert = "failed to save";
    }
    return msg_alert;
  },
};
