const Res = require("../controllers/response_controller");
const str = require("../helpers/messages").default;

export const _404 = (req, res, next) => {
  const resp = new Res(res);
  let error = resp.notFound({ msg: str.errorHanler._404 });
  next(error);
};

