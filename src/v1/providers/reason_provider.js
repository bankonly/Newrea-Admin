const Res = require("../controllers/default_res_controller");
const CancelReason = require("../models/Cancel_reason");
const Helpers = require("../helpers/Global");

export function validate(obj, update = false) {
  var error = {};
  var msg = "field is required";
  if (!Helpers.isEmpty(obj.body.name)) error.name = msg;
  if (!Helpers.isEmpty(obj.body.used_by)) error.used_by = msg;
  if (obj.body.used_by !== "driver" && obj.body.used_by !== "seller") {
    error.used_by = "allow only 'driver' and 'seller'";
  }
  if (update) {
    if (!Helpers.validateObjectId(obj.params.rs_id)) {
      error.rs_id = "invalid id";
    }
  }
  return error;
}

export async function create(body) {
  try {
    // is name exist
    const isName = await CancelReason.findOne({ name: body.name });
    if (isName) return Res.duplicated({ data: body.name });

    const saveData = { name: body.name, used_by: body.used_by };
    const isSave = await CancelReason.create(saveData);

    if (isSave) return Res.success({ data: isSave });
    return Res.badRequest({ msg: "cannot create" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

export async function update(body, rs_id) {
  try {
    const isId = await CancelReason.findById(rs_id);
    if (!isId) return Res.badRequest({ msg: "no data" });

    const isName = await CancelReason.findOne({ name: body.name });
    if (isName !== null && isId.name !== isName.name) {
      return Res.duplicated({ data: body.name });
    }

    isId.name = body.name;
    isId.used_by = body.used_by;

    if (isId.save()) return Res.success({ data: isId });
    return Res.badRequest({ msg: "cannot update" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}
