const _ = require("ssv-utils");
const bcrypt = _.bcryptFn;
const str = require("../helpers/messages").default;
const Model = require("newrea_model");
const UserModel = Model.User.Model;

// validate incoming data
export const validate = async (req, update = false) => {
  let err = {};
  let requried = str.requried;
  const body = req.body;

  if (_.isEmpty(body.username)) err.username = requried("username");
  if (_.isEmpty(body.password)) err.password = requried("password");
  if (_.isEmpty(body.cf_password)) err.cf_password = requried("cf_password");
  if (!_.isEmail(body.email)) err.email = requried("email");
  if (body.password !== body.cf_password) err.match = str.notMatch;
  if (!_.isEmptyObj(err)) return err;

  const name = await UserModel.findOne({ username: body.username }); // validate username
  const email = await UserModel.findOne({ email: body.email }); // validate email
  if (name) err.username = str.exist(body.username);
  if (email) err.email = str.exist(body.email);

  return err;
};

// prepare save data only three of these
export const saveData = async (body) => {
  return {
    username: body.username,
    password: await bcrypt.hashPassword(body.password),
    email: body.email,
  };
};

export const toJson = (data) => {
  delete data.password;
  delete data.__v;
  return data;
};

// validate login form
export const validateLogin = (body) => {
  let err = {}; // store error response
  let needed = str.requried;
  if (_.isEmpty(body.username)) err.username = needed("username");
  if (_.isEmpty(body.password)) err.password = needed("password");
  return err;
};

// validate of changing password
export const validateChangePassword = async (req) => {
  let err = {}; // store error response
  const body = req.body;
  let needed = str.requried;

  if (_.isEmpty(body.old_password)) err.old_password = needed("old_password");
  if (_.isEmpty(body.password)) err.password = needed("password");
  if (_.isEmpty(body.cf_password)) err.cf_password = needed("cf_password");
  if (body.password !== body.cf_password) err.password = str.notMatch;
  if (!_.isEmptyObj(err)) return err;

  const { old_password } = body;
  const user = await UserModel.findById(req.auth._id.toString());
  const verify = await bcrypt.verifyPassword(old_password, user.password);
  if (!verify) err = str.pwd_notMatch_old;

  return err;
};

export const validateResetPassword = async (body) => {
  let err = {}; // store error response
  if (_.isEmpty(body.password)) err.password = needed("password");
  if (_.isEmpty(body.cf_password)) err.cf_password = needed("cf_password");
  if (body.password !== body.cf_password) err.password = str.notMatch;
  return err;
};
