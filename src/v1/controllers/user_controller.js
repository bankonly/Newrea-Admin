const { UserModel } = require("../models/user");
const Res = require("./response_controller");
const userPvd = require("../providers/user_provider");
const _ = require("../helpers/utils");
const jwt = require("../helpers/jwt");
const bcrypt = require("../helpers/bcrypt");

export const register = async (req, res) => {
  const resp = new Res(res);
  try {
    // validate register data
    const validate = await userPvd.validate(req);
    if (!validate.status) {
      return resp.badRequest(validate);
    }

    const save_data = await userPvd.saveData(req.body);

    const user = await UserModel.create(save_data);
    if (!user) return resp.badRequest({ msg: _.msg.save(false) });

    return resp.created({});
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
};

export const me = (req, res) => {
  const resp = new Res(res);
  try {
    return resp.success({ data: req.auth });
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
};

export const login = async (req, res) => {
  const resp = new Res(res);
  try {
    const body = req.body;
    // validate register data
    const validate = userPvd.validateLogin(body);
    if (!validate.status) {
      return resp.badRequest(validate);
    }

    // find user by name
    const user = await UserModel.findOne({ username: body.username });
    if (!user) return resp.notFound({ data: body.username });

    // verify password
    const password = await bcrypt.verifyPassword(body.password, user.password);
    if (!password) return resp.badRequest({ msg: _.msg.notMatch });

    // new login count
    user.login_count = user.login_count + 1;
    await user.save();

    // generate token for access api
    const payload = {
      _id: user._id,
      login_count: user.login_count,
    };
    let token = jwt.jwtMethod(payload, process.env.TOKEN_LIFE_TIME);
    return resp.success({ data: { token: token } });
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
};

export const changePassword = async (req, res) => {
  const resp = new Res(res);
  try {
    const body = req.body;
    const validate = await userPvd.validateChangePassword(req);
    if (!validate.status) {
      return resp.badRequest(validate);
    }

    // get update data
    const user = await UserModel.findById(req.auth._id);
    user.password = await bcrypt.hashPassword(req.body.password);

    if (!(await user.save())) {
      return resp.badRequest({ msg: _.msg.save(false) });
    }
    return resp.success({ msg: _.msg.save(true) });
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
};
