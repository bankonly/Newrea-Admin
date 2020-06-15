// check if is float or not return boolean
const isFloat = floatNumber => {
  const isFloatType = isNaN(parseFloat(floatNumber));
  if (isFloatType) return false;
  return true;
};

const isInt = intNumber => {
  const isIntType = isNaN(parseInt(intNumber));
  if (isIntType) return false;
  return true;
};

const mongoose = require("mongoose");
const invalidObjectId = id => {
  return mongoose.Types.ObjectId.isValid(id);
};

export default {
  isFloat,
  isInt,
  invalidObjectId
};
