const _ = require("./utils");

export const validate = (obj) => {
  let error = [];
  if (!_.isObject(obj)) throw new Error("value should be object");
  Object.keys(obj).forEach((ele) => {
    const methods = obj[ele].split("|");
    if (_.isEmpty(methods[methods.length - 1])) {
      throw new Error("invalid validate input");
    }

    let keys = obj[ele];
    console.log(keys+"adssd");
    methods.forEach((method) => {

      if (!params(keys)[method]) {
        throw new Error("method invalid");
      }
      const errMsg = params(keys)[method];
      if (errMsg() !== null) {
        error.push(errMsg);
      }
    });
  });
  return error;
};

export const params = (key) => {
  return {
    required: (param) => {
      let msg = null;
      if (_.isEmpty(key)) msg = ":" + param + " is required";

      return {
        string: (method = "string") => {
          if (_.isEmpty(key, method)) msg = msg + " as " + method;
          return msg;
        },
        number: (method = "number") => {
          if (_.isEmpty(key, method)) msg = msg + " as " + method;
          return msg;
        },
        array: (method = "array") => {
          if (!_.isArray(key, method)) msg = msg + " as " + method;
          return msg;
        },
      };
    },
  };
};
