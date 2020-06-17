// check if is float or not return boolean
export const isFloat = floatNumber => {
  const isFloatType = isNaN(parseFloat(floatNumber));
  if (isFloatType) return false;
  return true;
};

export const isInt = intNumber => {
  const isIntType = isNaN(parseInt(intNumber));
  if (isIntType) return false;
  return true;
};

const mongoose = require("mongoose");
export const invalidObjectId = id => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const isEmptyObj = obj => {
  if (Object.keys(obj).length === 0) return true;
  return false;
};

/** validate delete userId */
export const validateObjectId = objectId => {
  var error = {};
  if (!objectId || !invalidObjectId(objectId))
    error.objectId = "invalid request";
  return error;
};

/** Multiple validate Object */
export const multipleValidateObj = (
  obj,
  deleteObject,
  checkType,
  {
    msgNumber = "field should be number and field is required ,maximum is 3",
    msgString = "field should be String and field is required"
  }
) => {
  var msg = null;
  if (checkType == "number") {
    msg = msgNumber;
  } else {
    msg = msgString;
  }

  var error = [];
  Object.keys(obj).forEach(element => {
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
      } else {
        if (typeof obj[element] !== checkType || !obj[element]) {
          error.push(`'${element}'` + " " + msg);
        }
      }
    }
  });
  return error;
};