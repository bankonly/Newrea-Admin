const Res = require("../controllers/response_controller");

export function AccessPermission(req, res, next) {
  const resp = new Res(res);
  try {
    if (req.is_super_admin) {
      next();
    } else {
      return resp.unAuthorized({ msg: "access denied" });
    }
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
}
