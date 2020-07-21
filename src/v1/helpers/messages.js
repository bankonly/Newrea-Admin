export default {
  requried: (field, method = "string") => {
    return `:${field} field is required as ${method}`;
  },
  exist: (field) => `${field} is already exist`,
  duplicated: (field) => `${field} is already exist`,
  notMatch: "password not match",
  NOTFOUND: (field) => field + " not found",
  pwd_notMatch_old: "password not match with old password",
  save: (isSave = true) => {
    let msg_alert = "success";
    if (!isSave) {
      msg_alert = "failed to save";
    }
    return msg_alert;
  },
  INVALID: {
    PHONE: "invalid phone number",
    EMAIL: "invalid email",
    OTP: "invalid otp",
  },
  OTP: {
    EXPIRED: "opt is expired",
    TOMANYSEND: (sec, method = "second") => {
      return "please try again after " + sec + " " + method;
    },
    SENDFAIL: "mail send failed",
    INVALID: "invalid otp code",
    LIMITED: "to many request please try again",
  },
  user: {
    email_or_phone: "pick email or phone ,atleast one option",
  },
  // error message
  errorHanler: {
    _404: "no api found please check your url again",
    _500: "something went wrong",
  },
};
