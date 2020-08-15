const Model = require("newrea_model");
const _ = require("ssv-utils");
const bcrypt = _.bcryptFn;
const resp = require("ssv-response");

export const register = async (req, res) => {
  try {
    // validate register data
    return resp.created({});
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
};