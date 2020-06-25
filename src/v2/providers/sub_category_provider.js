const Res = require("../controllers/default_res_controller");
const Banner = require("../models/main_banner");
const { isDate, compareBtwDate } = require("../helpers/Global");
const Helpers = require("../helpers/Global");
const ProductSeller = require("../models/product_seller").default;
const Category = require("../models/category");
const Brand = require("../models/brand");
const Seller = require("../models/seller");

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
      error.img = msg + " as image";
    }
  }
  return error;
}

export async function validateProductSeller(req, { model = null }) {
  try {
    const body = { ...req.body };

    const proSellerArray = {
      new_arrivals: body.new_arrivals.split(","),
      popular_item: body.popular_item.split(","),
      clearance_item: body.clearance_item.split(","),
      accessories: body.accessories.split(","),
    };
    const catArray = { cat_id: body.cat_id.split(",") };
    const brandArray = { brand: body.brand.split(",") };
    const sellerArray = { recommend_store: body.recommend_store.split(",") };

    const newArrivalArr = Helpers.convert(proSellerArray);
    const newCatArray = Helpers.convert(catArray);
    const newBrandArray = Helpers.convert(brandArray);
    const newSellerArray = Helpers.convert(sellerArray);

    let error = {};
    let msg = "id not found";
    // return (error.some = "");

    // find seller id if exist
    const isNewArrival = await ProductSeller.find({
      _id: { $in: newArrivalArr },
    });
    const isNewCatArray = await Category.find({ _id: { $in: newCatArray } });
    const isNewBrandArray = await Brand.find({
      _id: { $in: newBrandArray },
    });
    const isNewSellerArray = await Seller.find({
      _id: { $in: newSellerArray },
    });

    // arrival data check
    const foundArrival = isNewArrival.map((v) => v._id.toString());
    const foundCatArray = isNewCatArray.map((v) => v._id.toString());
    const foundBrandArray = isNewBrandArray.map((v) => v._id.toString());
    const foundSellerArray = isNewSellerArray.map((v) => v._id.toString());

    const selectArrival = [
      "new_arrivals",
      "popular_item",
      "clearance_item",
      "accessories",
    ];
    const notFoundArrival = Helpers.isFoundObjectId({
      body: body,
      select: selectArrival,
      found: foundArrival,
    });
    const notFoundCatArray = Helpers.isFoundObjectId({
      body: body,
      select: ["cat_id"],
      found: foundCatArray,
    });
    const notFoundBrandArray = Helpers.isFoundObjectId({
      body: body,
      select: ["brand"],
      found: foundBrandArray,
    });
    const notFoundSellerArray = Helpers.isFoundObjectId({
      body: body,
      select: ["recommend_store"],
      found: foundSellerArray,
    });

    if (notFoundArrival.length !== 0) {
      error.notFound = notFoundArrival;
    }
    if (notFoundCatArray.length !== 0) {
      error.notFoundCat = notFoundCatArray;
    }
    if (notFoundBrandArray.length !== 0) {
      error.notFoundBrand = notFoundBrandArray;
    }
    if (notFoundSellerArray.length !== 0) {
      error.notFoundSeller = notFoundSellerArray;
    }

    if (!Helpers.isEmptyObj(error)) {
      return Res.badRequest({ data: error });
    }

    let respData = null;

    const saveData = {
      new_arrivals: req.body.new_arrivals.split(","),
      cat_id: req.body.cat_id.split(","),
      popular_item: req.body.popular_item.split(","),
      brand: req.body.brand.split(","),
      accessories: req.body.accessories.split(","),
      recommend_store: req.body.recommend_store.split(","),
      clearance_item: req.body.clearance_item.split(","),
      title: req.body.title,
      desc: req.body.desc,
    };

    if (model) {
      model.new_arrivals = req.body.new_arrivals.split(",");
      model.cat_id = req.body.cat_id.split(",");
      model.popular_item = req.body.popular_item.split(",");
      model.brand = req.body.brand.split(",");
      model.accessories = req.body.accessories.split(",");
      model.recommend_store = req.body.recommend_store.split(",");
      model.clearance_item = req.body.clearance_item.split(",");
      model.title = req.body.title;
      model.desc = req.body.desc;
      respData = model;
    } else {
      respData = saveData;
    }
    return Res.success({ data: respData });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

export const defaultPopulate = [
  {
    path: "recommend_store",
    select: "-com",
  },
  {
    path: "clearance_item",
    select: "-_id",
  },
  {
    path:
      "new_arrivals cat_id popular_item brand accessories recommend_store clearance_item",
    select: "-__v",
  },
];
