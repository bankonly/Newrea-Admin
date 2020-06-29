const Res = require("./response_controller");
const QB = require("../helpers/query_builder");
const ProductSeller = require("../models/product_seller").default;

const default_populate = {
  path: "product_master_id",
  select: "_id name",
};

// get all most popular
export async function getAllProductSeller(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: ProductSeller,
      adminType: req.is_super_admin,
      populate: default_populate,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get most popular
export async function getProductSeller(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: ProductSeller,
      adminType: req.is_super_admin,
      id: req.params.pro_seller_id,
      populate: default_populate,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete most popular
export async function deleteProductSeller(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isSet = await QB.setActive(
      ProductSeller,
      req.params.pro_seller_id,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
