const Res = require("./response_controller");
const FeatProvider = require("../providers/Featured_store_provider");
const Helpers = require("../helpers/Global");
const QB = require("../helpers/query_builder");
const FeatureStore = require("../models/featured_store");

// save most popular
export async function saveFeaturedStore(req, res) {
  // define response
  const response = new Res(res);
  try {
    // validate save data
    const isValid = FeatProvider.validate(req);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    const isCreate = await FeatProvider.create(req.body.seller_id);
    if (isCreate.status) {
      const populate = {
        path: "seller_id",
        select: "-__v -pass",
      };
      const data = await QB.fetch({
        model: FeatureStore,
        id: isCreate.data._id.toString(),
        populate: populate,
      });
      return response.success(data);
    }
    return response.success(isCreate);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update most popular
export async function updateFeaturedStore(req, res) {
  // define response
  const response = new Res(res);
  try {
    // validate save data
    const isValid = FeatProvider.validate(req, true);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }
    const isUpdate = await FeatProvider.update(
      req.body.seller_id,
      req.params.feat_id
    );

    if (isUpdate.status) {
      const populate = {
        path: "seller_id",
        select: "-__v -pass",
      };

      const data = await QB.fetch({
        model: FeatureStore,
        id: isUpdate.data._id.toString(),
        populate: populate,
      });
      return response.success(data);
    }
    return response.success(isUpdate);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get all most popular
export async function getAllFeaturedStore(req, res) {
  // define response
  const response = new Res(res);
  try {
    const populate = {
      path: "seller_id",
      select: "-__v -pass",
    };
    const data = await QB.fetch({
      model: FeatureStore,
      adminType: req.is_super_admin,
      populate: populate,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get most popular
export async function getFeaturedStore(req, res) {
  // define response
  const response = new Res(res);
  try {
    const populate = {
      path: "seller_id",
      select: "-__v -pass",
    };
    const data = await QB.fetch({
      model: FeatureStore,
      adminType: req.is_super_admin,
      id: req.params.feat_id,
      populate: populate,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete most popular
export async function deleteFeaturedStore(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isSet = await QB.setActive(
      FeatureStore,
      req.params.feat_id,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
