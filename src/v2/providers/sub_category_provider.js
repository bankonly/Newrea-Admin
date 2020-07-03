import { json } from "body-parser";

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
  if(!Helpers.isFile(obj.files,"img")) error.img = "field is required as image"
  if (!Helpers.isEmpty(body.title)) error.title = msg;
  if (!Helpers.isEmpty(body.desc)) error.desc = msg;
  if (!Helpers.isEmpty(body.banner) || !Helpers.validateObjectId(body.banner))
    error.banner = msg + " as objectId";
  if (!Helpers.isEmpty(body.new_arrivals)) error.new_arrivals = arrayMsg;
  if (!Helpers.isEmpty(body.cat_id)) error.cat_id = arrayMsg;
  if (!Helpers.isEmpty(body.popular_item)) error.popular_item = arrayMsg;
  if (!Helpers.isEmpty(body.brand)) error.brand = arrayMsg;
  if (!Helpers.isEmpty(body.clearance_item)) error.clearance_item = arrayMsg;
  if (!Helpers.isEmpty(body.accessories)) error.accessories = arrayMsg;
  if (!Helpers.isEmpty(body.recommend_store)) error.recommend_store = arrayMsg;

  delete body.title;
  delete body.desc;
  delete body.banner;

  // const new_arrivals = JSON.parse(body.new_arrivals);
  // const isDuplicateArrayMany = (arr) => {
  //   let duplicate = [];
  //   Object.keys(arr).forEach((value, index) => {
  //     let data = null;
  //     if (typeof arr[value] == "object" || typeof arr[value] == "string") {
  //       data = JSON.parse(arr[value]);
  //     }
  //     console.log(data)
  //     const found = data.filter((v, i) => {
  //       foundIn = data.indexOf(v) !== i
  //       console.log(found)
  //     });
  //     duplicate.push(found);
  //   });
  //   return duplicate;
  // };

  // console.log(isDuplicateArrayMany(body));

  const isValid = await Helpers.isSplitArrayObjectId({
    array: body,
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
      new_arrivals: JSON.parse(body.new_arrivals),
      popular_item: JSON.parse(body.popular_item),
      clearance_item: JSON.parse(body.clearance_item),
      accessories: JSON.parse(body.accessories),
    };

    const newArrivalArr = Helpers.convert(proSellerArray);

    let error = {};
    let msg = "id not found";
    // find seller id if exist
    const isNewArrival = await ProductSeller.find({
      _id: { $in: newArrivalArr },
    });
    const isNewCatArray = await Category.find({
      parent_id: { $nin: JSON.parse(body.cat_id) },
    });
    const isNewBrandArray = await Brand.find({
      _id: { $in: JSON.parse(body.brand) },
    });
    const isNewSellerArray = await Seller.find({
      _id: { $in: JSON.parse(body.recommend_store) },
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

    const isBand = await Banner.findById(req.body.banner);
    if (!isBand) error.banner = msg;

    if (!Helpers.isEmptyObj(error)) {
      return Res.badRequest({ data: error });
    }

    let respData = null;

    const saveData = {
      new_arrivals: JSON.parse(req.body.new_arrivals),
      cat_id: JSON.parse(req.body.cat_id),
      popular_item: JSON.parse(req.body.popular_item),
      brand: JSON.parse(req.body.brand),
      accessories: JSON.parse(req.body.accessories),
      recommend_store: JSON.parse(req.body.recommend_store),
      clearance_item: JSON.parse(req.body.clearance_item),
      title: req.body.title,
      desc: req.body.desc,
      banner: req.body.banner,
    };

    if (model) {
      model.new_arrivals = JSON.parse(req.body.new_arrivals);
      model.cat_id = JSON.parse(req.body.cat_id);
      model.popular_item = JSON.parse(req.body.popular_item);
      model.brand = JSON.parse(req.body.brand);
      model.accessories = JSON.parse(req.body.accessories);
      model.recommend_store = JSON.parse(req.body.recommend_store);
      model.clearance_item = JSON.parse(req.body.clearance_item);
      model.title = req.body.title;
      model.desc = req.body.desc;
      model.banner = req.body.banner;
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
    select: "user_name name phone img logo is_online",
  },
  {
    path: "brand",
    select: "desc name logo _id",
  },
  {
    path: "cat_id",
    select: "-created_date -parent_id -is_active",
    // populate:{
    //   path:"parent_id",
    //   populate:{
    //     path:"parent_id"
    //   }
    // }
  },
  {
    path: "banner",
    select: "img _id",
  },
  {
    path: "new_arrivals popular_item accessories clearance_item",
    select: "price stock",
    populate: [
      {
        path: "product_master_id",
        select: "img name _id brand desc",
      },
      {
        path: "product_option_id",
        select: "option_detail",
      },
    ],
  },
];
