const Res = require("./response_controller");

// save most popular
export async function saveBanner(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update most popular
export async function updateBanner(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    return response.success({ msg: "updated" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get all most popular
export async function getAllBanner(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get most popular
export async function getBanner(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete most popular
export async function deleteBanner(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    return response.success({ msg: "deleted" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
