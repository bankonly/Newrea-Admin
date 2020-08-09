export default (req, res, next) => {
  global.body = req.body;
  global.params = req.parmas;
  global.headers = req.headers;
  global.auth = req.auth;
  global.res = req.res;
  next();
};
