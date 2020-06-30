import constant from "../configs/constant";

class ResponseController {
  constructor(res) {
    this.res = res;
  }

  // duplicated
  duplicated({ data = {}, msg = "duplicated", status = false, code = 400 }) {
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }

  // success
  success({ data = {}, msg = "success", status = true, code = 200 }) {
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }

  // deleted
  deleted({ data = {}, msg = "deleted success", status = true, code = 200 }) {
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }

  // updated
  updated({ data = {}, msg = "updated success", status = true, code = 200 }) {
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }

  // created

  created({ data = {}, msg = "created success", status = true, code = 200 }) {
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }

  // error
  error({ data = {}, msg = "something wrong", status = false, code = 500 }) {
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }

  // badRequest
  badRequest({ data = {}, msg = "badRequest", status = false, code = 400 }) {
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }

  // notFound
  notFound({ data = {}, msg = "notFound", status = false, code = 404 }) {
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }

  // unAuthorized
  unAuthorized({
    data = {},
    msg = "unAuthorized",
    status = false,
    code = 419,
  }) {
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }

  // notAllowed
  notAllowed({ data = {}, msg = "notAllowed", status = false, code = 405 }) {
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }

  // render
  render({ data = {}, msg = "success", status = true, code = 200 }) {
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }

  // render
  somethingWrong({
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
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }

  invalidObjectId({
    data = {},
    msg = "invalid object id",
    status = true,
    code = 400,
  }) {
    return this.res.json({
      message: msg,
      status: status,
      code: code,
      data: data,
    });
  }
}

module.exports = ResponseController;
