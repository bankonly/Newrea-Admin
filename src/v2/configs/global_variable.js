const Res = require("../controllers/response_controller");

export default (req, res, next) => {
  global.Res = new Res(res);
  next();
};
