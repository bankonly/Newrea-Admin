const constant = require("../configs/constant");

// duplicated
export function duplicated({
  data = {},
  msg = "duplicated",
  status = false,
  code = 400,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

// success
export function success({
  data = {},
  msg = "success",
  status = true,
  code = 200,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

// deleted
export function deleted({
  data = {},
  msg = "deleted success",
  status = true,
  code = 200,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

// updated
export function updated({
  data = {},
  msg = "updated success",
  status = true,
  code = 200,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

// created

export function created({
  data = {},
  msg = "created success",
  status = true,
  code = 201,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

// error
export function error({
  data = {},
  msg = "something wrong",
  status = false,
  code = 500,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

// badRequest
export function badRequest({
  data = {},
  msg = "badRequest",
  status = false,
  code = 400,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

// notFound
export function notFound({
  data = {},
  msg = "no content",
  status = false,
  code = 204,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

// unAuthorized
export function unAuthorized({
  data = {},
  msg = "unAuthorized",
  status = false,
  code = 419,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

// notAllowed
export function notAllowed({
  data = {},
  msg = "not allow",
  status = false,
  code = 405,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

// render
export function render({
  data = {},
  msg = "success",
  status = true,
  code = 200,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

// render
export function somethingWrong({
  data = {},
  msg = "something wrong",
  status = false,
  code = 500,
  error,
}) {
  console.log(error);
  if (constant.ENV_APP !== "production") {
    msg = error.message;
  }
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

export function invalidObjectId({
  data = {},
  msg = "invalid object id",
  status = true,
  code = 400,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}

export function fail({
  data = {},
  msg = "process failed",
  status = true,
  code = 500,
}) {
  return res.json({
    message: msg,
    status: status,
    code: code,
    data: data,
  });
}
