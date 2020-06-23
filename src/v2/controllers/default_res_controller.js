export function duplicated({
  data = {},
  msg = "duplicated",
  status = false,
  code = 409,
}) {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
}

export function success({
  data = {},
  msg = "success",
  status = true,
  code = 200,
}) {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
}

export function deleted({
  data = {},
  msg = "deleted success",
  status = true,
  code = 200,
}) {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
}

export function updated({
  data = {},
  msg = "updated success",
  status = true,
  code = 200,
}) {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
}

export function created({
  data = {},
  msg = "created success",
  status = true,
  code = 200,
}) {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
}

export function error({
  data = {},
  msg = "something wrong",
  status = false,
  code = 500,
}) {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
}

export function badRequest({
  data = {},
  msg = "badRequest",
  status = false,
  code = 400,
}) {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
}

export function notFound({
  data = {},
  msg = "notFound",
  status = false,
  code = 404,
}) {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
}

export function unAuthorized({
  data = {},
  msg = "unAuthorized",
  status = false,
  code = 419,
}) {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
}

export function notAllowed({
  data = {},
  msg = "notAllowed",
  status = false,
  code = 405,
}) {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
}

export function outPut({
  data = {},
  msg = "success",
  status = true,
  code = 200,
}) {
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
}

export function somethingWrong({
  data = {},
  msg = "something wrong",
  status = false,
  code = 500,
  error,
}) {
  console.log(error.message);
  console.log("---------------------------------------");
  console.log(error);
  return {
    msg: msg,
    status: status,
    code: code,
    data: data,
  };
}
