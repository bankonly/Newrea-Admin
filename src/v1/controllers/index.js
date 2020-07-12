const Res = require("./response_controller");

// get all user
export const getUsers = (req, res) => {
  const resp = new Res(res);
  try {
    return resp.success({});
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
};
