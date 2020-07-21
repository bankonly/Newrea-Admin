const constant = require("../configs/constant");

// duplicated
export const duplicated = ({
  data = {},
  msg = "duplicated",
  status = false,
  code = 400,
}) => {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};

// success
export const success = ({
  data = {},
  msg = "success",
  status = true,
  code = 200,
}) => {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};

// deleted
export const deleted = ({
  data = {},
  msg = "deleted success",
  status = true,
  code = 200,
}) => {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};

// updated
export const updated = ({
  data = {},
  msg = "updated success",
  status = true,
  code = 200,
}) => {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};

// created

export const created = ({
  data = {},
  msg = "created success",
  status = true,
  code = 200,
}) => {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};

// error
export const error = ({
  data = {},
  msg = "something wrong",
  status = false,
  code = 500,
}) => {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};

// badRequest
export const badRequest = ({
  data = {},
  msg = "badRequest",
  status = false,
  code = 400,
}) => {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};

// notFound
export const notFound = ({
  data = {},
  msg = "notFound",
  status = false,
  code = 404,
}) => {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};

// unAuthorized
export const unAuthorized = ({
  data = {},
  msg = "unAuthorized",
  status = false,
  code = 419,
}) => {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};

// notAllowed
export const notAllowed = ({
  data = {},
  msg = "notAllowed",
  status = false,
  code = 405,
}) => {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};

// render
export const render = ({
  data = {},
  msg = "success",
  status = true,
  code = 200,
}) => {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};

// render
export const somethingWrong = ({
  data = {},
  msg = "something wrong",
  status = false,
  code = 500,
  error,
}) => {
  console.log(error);
  if (constant.ENV_APP !== "production") {
    msg = error.message;
  }
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};

export const invalidObjectId = ({
  data = {},
  msg = "invalid object id",
  status = true,
  code = 400,
}) => {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
};
