const resp = require("./response_controller");

// get all user
export const getUsers = (req, res) => {
  try {
    return resp.success({});
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
};
