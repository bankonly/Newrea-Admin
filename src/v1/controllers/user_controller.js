import constant from "../configs/constant";
const Model = require("newrea_model");
const resp = require("ssv-response");
const _user = require("../providers/user_provider");
const _ = require("../helpers/utils");
const jwt = require("../helpers/jwt");
const bcrypt = require("../helpers/bcrypt");
const MSG = require("../helpers/messages").default;
const _mail = require("../providers/mail_provider");
const UserModel = Model.User.Model;
const OtpModel = Model.OTP.Model;
const File = require("ssv-file-upload");

export const register = async (req, res) => {
  try {
    // validate register data
    const validate = await _user.validate(req);
    if (!_.isEmptyObj(validate)) {
      return resp.badRequest({ data: validate });
    }

    const save_data = await _user.saveData(req.body);
    const user = await UserModel.create(save_data);
    if (!user) return resp.badRequest({ msg: _.msg.save(false) });

    return resp.created({});
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
};

export const me = (req, res) => {
  try {
    return resp.success({ data: req.auth });
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
};

export const login = async (req, res) => {
  try {
    const body = req.body;
    // validate register data
    const validate = _user.validateLogin(body);
    if (!_.isEmptyObj(validate)) {
      return resp.badRequest({ data: validate });
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
  try {
    const body = req.body;
    const validate = await _user.validateChangePassword(req);
    if (!_.isEmptyObj(validate)) {
      return resp.badRequest({ data: validate });
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

export const resetPassword = async (req, res) => {
  try {
    if (!_.isEmail(body.email)) {
      return resp.badRequest({ msg: MSG.INVALID.EMAIL });
    }

    const user = await UserModel.findOne({ email: body.email }).select(
      "_id email"
    );
    if (!user) {
      return resp.notFound({ msg: MSG.NOTFOUND("email") });
    }

    const user_id = user._id.toString();

    let opt_code = {
      opt_code: _.generateOtp({}),
    };

    let save_data = {};
    save_data.code = _.generateOtp({});
    save_data.expire_time = _.date.addTime(constant.OTP_EXPIRED_TIME);
    save_data.resend_after = _.date.addTime(constant.OPT_ALLOW_RESENT_SECOND);
    save_data.author = user._id;

    let new_otp = null;

    const otp_data = await OtpModel.findOne({ author: user_id });
    if (!otp_data) {
      new_otp = await OtpModel.create(save_data);
    } else {
      const resend_time_sec = _.date.dateToSec(otp_data.resend_after);
      const now_sec = _.date.nowSec();
      const minus_in_sec = resend_time_sec - now_sec;

      if (now_sec < resend_time_sec) {
        return resp.badRequest({ msg: MSG.OTP.TOMANYSEND(minus_in_sec) });
      }

      otp_data.resend_count = 0;
      otp_data.expire_time = save_data.expire_time;
      otp_data.resend_after = save_data.resend_after;
      otp_data.code = save_data.code;
      new_otp = await otp_data.save();
    }
    if (!new_otp) return resp.fail({ msg: MSG.save(false) });

    const send = await _mail.send({
      to: user.email,
      otp_code: opt_code.opt_code,
      link: _mail.generateLink({
        host: constant.APP_HOST,
        otp_code: opt_code.opt_code,
      }),
    });

    const payload = {
      _id: user._id,
    };
    const token = jwt.jwtMethod(
      payload,
      process.env.TOKEN_LIFE_TIME_RESET,
      process.env.SECRET_KEY_RESET_PASSWORD
    );

    if (!send.status) return resp.fail({ msg: MSG.OTP.SENDFAIL });
    return resp.success({
      data: {
        token: token,
      },
    });
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
};

// otp_code
export const verifyOtp = async (req, res) => {
  try {
    if (_.isEmpty(body.otp_code)) {
      return resp.badRequest({ msg: MSG.requried("otp_code") });
    }

    const otp_data = await OtpModel.findOne({ author: auth._id });
    if (!otp_data) {
      return resp.notFound({ msg: MSG.NOTFOUND("id") });
    }

    const expire_time_sec = _.date.dateToSec(otp_data.expire_time);
    const now_sec = _.date.nowSec();

    // check opt_code is expired or not
    if (expire_time_sec < now_sec) {
      otp_data.resend_count = 0;
      await otp_data.save();
      return resp.badRequest({ msg: MSG.OTP.EXPIRED });
    }

    if (otp_data.resend_count > constant.OTP_ALLOW_SEND_TIME) {
      return resp.badRequest({ msg: MSG.OTP.LIMITED });
    }

    if (otp_data.otp_code !== body.opt_code) {
      otp_data.resend_count += 1;
      return resp.badRequest({ msg: MSG.OTP.INVALID });
    }

    otp_data.allow_to_reset = true;
    await otp_data.save();

    return resp.success({});
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
};

export const registerNewPassword = async (req, res) => {
  try {
    const validate = _user.validateResetPassword(body);
    if (!_.isEmptyObj(validate)) {
      return resp.badRequest({ data: validate });
    }

    const otp_data = await OtpModel.findOne({
      author: auth._id,
      allow_to_reset: true,
    });
    if (!otp_data) return resp.notFound({ msg: MSG.NOTFOUND("id") });

    const user = await UserModel.findById(auth._id);
    if (!user) return resp.notFound({ msg: MSG.NOTFOUND("id") });

    user.password = await bcrypt.hashPassword(body.password);
    if (!(await user.save())) {
      return resp.fail({});
    }

    otp_data.allow_to_reset = false;
    await otp_data.save();

    return resp.success({});
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
};
