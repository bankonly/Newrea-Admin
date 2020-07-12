export default {
  requried: (field, method = "string") => {
    return `:${field} field is required as ${method}`;
  },
  duplicated: (field) => `${field} is already exist`,
  notMatch: "password not match",
  pwd_notMatch_old: "password not match with old password",
  save: (isSave = true) => {
    let msg_alert = "success";
    if (!isSave) {
      msg_alert = "failed to save";
    }
    return msg_alert;
  },
};
