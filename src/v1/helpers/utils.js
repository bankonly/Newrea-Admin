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
  exist: (field) => `${field} is already exist`,
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

export const isPhone = (phone) => {
  if (isEmpty(phone)) return false;
  return {
    la: (country_number = "20", limit = 10) => {
      const length = phone.split("");
      const start_number = phone.substring(0, 2);
      if (length.length == limit && start_number == country_number) return true;
      return false;
    },
  };
};

export const isEmail = (email) => {
  if (isEmpty(email)) return false;
  const isAddress = email.split("@");
  const isCom = email.split(".com");
  if (isAddress.length == 1 || isCom.length == 1) return false;
  if (!isEmpty(isCom[isCom.length - 1])) return false;
  return true;
};

export const isObject = (obj) => {
  if (typeof obj !== "object") return false;
  if (Object.keys(obj).length === 0) return false;
  return true;
};

export const date = {
  getTimeStamp: (plus = null) => {
    let time = new Date().getTime();
    if (plus !== null) time += plus;
    return time;
  },
  nowSec: () => {
    return parseInt(new Date().getTime() / 1000);
  },
  timeStampToSec: (timeTamp) => parseInt(timeTamp / 1000),
  dateToSec: (date) => {
    const dt = new Date(date);
    return parseInt(dt.getTime() / 1000);
  },
  getSecond: () => {
    const date = new Date();
    return date.getSeconds();
  },
  addTime: (value, method = "second") => {
    if (method == "second") {
      value = value * 1000;
    } else {
      value = value * 60000;
    }
    return new Date(new Date().getTime() + value);
  },
};

export const generateOtp = ({
  limit = 6,
  multiple = 10,
  digit = "0123456789",
}) => {
  let opt = "";
  for (let i = 0; i < limit; i++) {
    opt += digit[Math.floor(Math.random() * multiple)];
  }
  return opt;
};
