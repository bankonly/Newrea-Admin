const Res = require("./response_controller");
const RecProvider = require("../providers/recommend_item_provider");
const Helpers = require("../helpers/Global");
const QB = require("../helpers/query_builder");
const RecommendItem = require("../models/recommend_item");
const ProSeller = require("../models/product_seller").default;

// save most popular
export async function saveRecommendItem(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isValid = RecProvider.validate(req);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    // check prodyuct seller id is exist or not
    const idProSellerId = ProSeller.findById(req.body.product_seller_id);
    if (!idProSellerId) {
      return response.notFound({ msg: "no product seller" });
    }

    const createData = { product_seller_id: req.body.product_seller_id };
    const isCreate = await RecommendItem.create(createData);
    if (!isCreate) return response.badRequest({ msg: "cannot create" });
    return response.success({ data: isCreate });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update most popular
export async function updateRecommendItem(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isValid = RecProvider.validate(req, true);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    // check incoming id
    const isId = await RecommendItem.findById(req.params.rec_id);
    if (!isId) return response.badRequest({});

    // check prodyuct seller id is exist or not
    const idProSellerId = ProSeller.findById(req.body.product_seller_id);
    if (!idProSellerId) {
      return response.notFound({ msg: "no product seller" });
    }

    isId.product_seller_id = req.body.product_seller_id;
    if (!isId.save()) return response.badRequest({ msg: "cannot update" });
    return response.success({ data: isId });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get all most popular
export async function getAllRecommendItem(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: RecommendItem,
      adminType: req.is_super_admin,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get most popular
export async function getRecommendItem(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: RecommendItem,
      adminType: req.is_super_admin,
      id: req.params.rec_id,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete most popular
export async function deleteRecommendItem(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isSet = await QB.setActive(
      RecommendItem,
      req.params.rec_id,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
