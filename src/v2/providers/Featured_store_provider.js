const Res = require("../controllers/default_res_controller");
const FeaturedStore = require("../models/featured_store");
const Helpers = require("../helpers/Global");
const Seller = require("../models/seller");

export function validate(obj, update = false) {
  var error = {};
  if (!Helpers.isEmpty(obj.body.seller_id)) error.seller_id = "field is required";
  if (!Helpers.validateObjectId(obj.body.seller_id)) error.seller_id = "invalid id";
  if (update) {
    if (!Helpers.isEmpty(obj.params.feat_id)) error.feat_id = "field is required";
    if (!Helpers.validateObjectId(obj.params.feat_id)) error.feat_id = "invalid id";
  }
  return error;
}

export async function create(seller_id) {
  try {
    const isId = Seller.findById(seller_id);
    if (!isId) return Res.badRequest({ msg: "no seller data" });

    const saveData = { seller_id: seller_id };
    const isSave = await FeaturedStore.create(saveData);
    if (isSave) return Res.success({ data: isSave });
    return Res.badRequest({ msg: "cannot create" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

export async function update(seller_id, feat_id) {
  try {
    const isId = await Seller.findById(seller_id);
    const isIdFeat = await FeaturedStore.findById(feat_id);

    var error = {};
    if (!isId) error.seller_id = "not exist";
    if (!isIdFeat) error.feat_id = "not exist";

    if (!Helpers.isEmptyObj(error)) {
      return Res.badRequest({ data: error });
    }

    isIdFeat.seller_id = seller_id;
    if ((await isIdFeat).save()) return Res.success({ data: isIdFeat });
    return Res.badRequest({ msg: "cannot update" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}
