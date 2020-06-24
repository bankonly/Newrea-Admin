// check if is float or not return boolean
export function isFloat(floatNumber) {
  const isFloatType = isNaN(parseFloat(floatNumber));
  if (isFloatType) return false;
  return true;
}

export function isInt(intNumber) {
  const isIntType = isNaN(parseInt(intNumber));
  if (isIntType) return false;
  return true;
}

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

// Multiple validate Object
export function multipleValidateObj(
  obj,
  deleteObject,
  checkType,
  {
    msgNumber = "field should be number and field is required ,maximum is 3",
    msgString = "field should be String and field is required",
    msgArray = "field is required and should be array",
  }
) {
  var msg = null;
  if (checkType == "number") {
    msg = msgNumber;
  } else if (checkType == "string") {
    msg = msgString;
  } else {
    msg = msgArray;
  }

  var error = [];
  Object.keys(obj).forEach((element) => {
    if (deleteObject.includes(element)) {
      delete obj[element];
    } else {
      if (checkType == "number") {
        if (
          typeof obj[element] !== checkType ||
          obj[element] > 3 ||
          !obj[element]
        ) {
          error.push(`'${element}'` + " " + msg);
        }
      } else if (checkType == "string") {
        if (typeof obj[element] !== checkType || !obj[element]) {
          error.push(`'${element}'` + " " + msg);
        }
      } else {
        if (!Array.isArray(obj[element]) || !obj[element]) {
          error.push(`'${element}'` + " " + msg);
        }
      }
    }
  });
  return error;
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
  if (value == null || !value) return false;
  if (typeof value !== method) return false;
  return true;
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
export function isFile(files, field = null) {
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
