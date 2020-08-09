const resp = require("../controllers/response_controller");
const str = require("../helpers/messages").default;

export const _404 = (req, res, next) => {
  let error = resp.notFound({ msg: str.errorHanler._404 });
  next(error);
};

