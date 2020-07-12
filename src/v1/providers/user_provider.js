const _ = require("../helpers/utils");
const bcrypt = require("../helpers/bcrypt");
const resPvd = require("./response_provider");
const { UserModel } = require("../models/user");

const res = new resPvd();

// validate incoming data
export const validate = async (req, update = false) => {
  try {
    let err = {}; // store error response
    let needed = _.msg.requried;
    let exist = _.msg.duplicated;
    const body = req.body; // store body data

    // validate and return with message
    if (_.isEmpty(body.username)) err.username = needed("username");
    if (_.isEmpty(body.password)) err.password = needed("password");
    if (_.isEmpty(body.cf_password)) err.cf_password = needed("cf_password");
    if (body.password !== body.cf_password) err.match = _.msg.notMatch;

    if (!_.isEmptyObj(err)) return res.badRequest({ data: err });

    // validate username
    const name = await UserModel.findOne({ username: body.username });
    if (name) {
      err.exist = exist(body.username);
      return res.badRequest({ data: err });
    }

    return res.success({});
  } catch (error) {
    return res.somethingWrong({ error: error });
  }
};

// prepare save data only three of these
export const saveData = async (body) => {
  return {
    username: body.username,
    password: await bcrypt.hashPassword(body.password),
  };
};

export const display = (data) => {
  delete data.password;
  delete data.__v;
  console.log(data);
  return data;
};

// validate login form
export const validateLogin = (body) => {
  try {
    let err = {}; // store error response
    let needed = _.msg.requried;

    // validate and return with message
    if (_.isEmpty(body.username)) err.username = needed("username");
    if (_.isEmpty(body.password)) err.password = needed("password");
    if (!_.isEmptyObj(err)) return res.badRequest({ data: err });

    return res.success({});
  } catch (error) {
    return res.somethingWrong({ error: error });
  }
};

// validate of changing password
export const validateChangePassword = async (req) => {
  try {
    let err = {}; // store error response
    const body = req.body;
    let needed = _.msg.requried;

    // validate and return with message
    if (_.isEmpty(body.old_password)) err.old_password = needed("old_password");
    if (_.isEmpty(body.password)) err.password = needed("password");
    if (_.isEmpty(body.cf_password)) err.cf_password = needed("cf_password");
    if (body.password !== body.cf_password) err.check = _.msg.notMatch;
    if (!_.isEmptyObj(err)) return res.badRequest({ data: err });

    const { old_password } = body;
    // validate password with hashed password
    const user = await UserModel.findById(req.auth._id.toString());
    const verify = await bcrypt.verifyPassword(old_password, user.password);

    if (!verify) return res.badRequest({ msg: _.msg.pwd_notMatch_old });
    return res.success({});
  } catch (error) {
    return res.somethingWrong({ error: error });
  }
};
