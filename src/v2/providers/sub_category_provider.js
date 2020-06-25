const Res = require("../controllers/default_res_controller");
const Banner = require("../models/main_banner");
const { isDate, compareBtwDate } = require("../helpers/Global");
const Helpers = require("../helpers/Global");
const ProductSeller = require("../models/product_seller").default;
const Category = require("../models/category");

// validate save data
export async function validate(obj, update = true) {
  const body = { ...obj.body };
  let error = {};
  let msg = "field is required";
  let arrayMsg = "field is required as array id,id...";

  if (!Helpers.isEmpty(body.title)) error.title = msg;
  if (!Helpers.isEmpty(body.desc)) error.desc = msg;
  if (!Helpers.isEmpty(body.new_arrivals)) error.new_arrivals = arrayMsg;
  if (!Helpers.isEmpty(body.cat_id)) error.cat_id = arrayMsg;
  if (!Helpers.isEmpty(body.popular_item)) error.popular_item = arrayMsg;
  if (!Helpers.isEmpty(body.brand)) error.brand = arrayMsg;
  if (!Helpers.isEmpty(body.clearance_item)) error.clearance_item = arrayMsg;
  if (!Helpers.isEmpty(body.accessories)) error.accessories = arrayMsg;
  if (!Helpers.isEmpty(body.recommend_store)) error.recommend_store = arrayMsg;

  delete body.title;
  delete body.desc;

  const isValid = await Helpers.isSplitArrayObjectId({
    array: body,
    split: ",",
  });

  if (!isValid && isValid !== undefined) {
    error.invalid_object_id = "invalid input";
  }
  if (update) {
    if (!Helpers.isFile(obj.files, "img")) {
      error.img = msg = " as image";
    }
  }
  return error;
}

export async function validateProductSeller(req) {
  try {
    const body = { ...req.body };

    const proSellerArray = [
      body.new_arrivals,
      body.popular_item,
      body.clearance_item,
      body.accessories,
    ];

    let error = {};
    let msg = "not found";

    // find seller id if exist
    const isNewArrival = await ProductSeller.find({
      _id: { $in: proSellerArray },
    }).select("_id");

    // convert object from _id to one array
    const found = isNewArrival.map((value) => value._id.toString());
    const notFoundId = Helpers.isFoundObjectId({
      body: body,
      del: ["recommend_store", "title", "cat_id", "brand", "desc"],
      found: found,
    });
    if (notFoundId.length !== 0) error.notFound = notFoundId;

    const isCat = await Category.findById(req.body.cat_id);
    if (!isCat) error.cat_id = msg;

    if (!Helpers.isEmptyObj(error)) {
      return Res.badRequest({ data: error });
    }

    return Res.success({});
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}
