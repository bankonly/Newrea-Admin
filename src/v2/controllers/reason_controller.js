const Res = require("./response_controller");
const ReasonProvider = require("../providers/reason_provider");
const Helpers = require("../helpers/Global");
const QB = require("../helpers/query_builder");
const CancelReason = require("../models/Cancel_reason");

// save most popular
export async function saveReason(req, res) {
  // define response
  const response = new Res(res);
  try {
    // validate save data
    const isValid = ReasonProvider.validate(req);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    const isCreate = await ReasonProvider.create(req.body);
    return response.success(isCreate);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update most popular
export async function updateReason(req, res) {
  // define response
  const response = new Res(res);
  try {
    // validate save data
    const isValid = ReasonProvider.validate(req, true);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }
    const isUpdate = await ReasonProvider.update(req.body, req.params.rs_id);
    return response.success(isUpdate);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get all most popular
export async function getAllReason(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: CancelReason,
      adminType: req.is_super_admin,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get most popular
export async function getReason(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: CancelReason,
      adminType: req.is_super_admin,
      id: req.params.rs_id,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete most popular
export async function deleteReason(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isSet = await QB.setActive(
      CancelReason,
      req.params.rs_id,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
