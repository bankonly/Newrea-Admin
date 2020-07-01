// Files Import Models,Controller ...
const Res = require("./response_controller");
const QueryBuilder = require("../helpers/query_builder");
const Helpers = require("../helpers/Global");
const AccessPolicy = require("../models/access_policy");
const Admin = require("../models/admin");
const AccProvider = require("../providers/access_policy_provider");

// get access policy
export async function getAllAccessPolicy(req, res) {
  const response = new Res(res);
  try {
    const accp = await AccProvider.fetch();
    return response.success(accp);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get access policy
export async function getAccessPolicy(req, res) {
  const response = new Res(res);
  try {
    if (!Helpers.validateObjectId(req.params.accp_id)) {
      return response.badRequest({ msg: "invalid access policy id" });
    }
    const accp = await AccProvider.fetch(req.params.accp_id);
    return response.success(accp);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// create new access policy
export async function createNewAccessPolicy(req, res) {
  const response = new Res(res);
  try {
    // create data
    const validateData = {
      admin: req.body.admin,
      most_popular: req.body.most_popular,
      featured_stores: req.body.featured_stores,
      recommended_item: req.body.recommended_item,
      category: req.body.category,
      driver_approved: req.body.driver_approved,
      banner: req.body.banner,
      popular_search: req.body.popular_search,
      reason: req.body.reason,
      is_super_admin: req.body.is_super_admin,
      name: req.body.name,
      order: req.body.order,
      seller: req.body.seller,
      return: req.body.return,
      brand: req.body.brand,
      categories: req.body.categories,
      currency: req.body.currency,
      delivery_type: req.body.delivery_type,
      delivery_fee: req.body.delivery_fee,
      payment_method: req.body.payment_method,
    };

    // Clone data from validateData
    const createData = { ...validateData };

    // validate request data from body
    const isValidData = AccProvider.validateCreateData(validateData);
    if (!Helpers.isEmptyObj(isValidData)) {
      return response.badRequest({ data: isValidData });
    }

    // call create func from provider
    const isCreated = await AccProvider.create(createData, req.is_super_admin);
    return response.success(isCreated);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update access policy
export async function updateAccessPolicy(req, res) {
  const response = new Res(res);
  try {
    // create data
    const validateData = {
      admin: req.body.admin,
      most_popular: req.body.most_popular,
      featured_stores: req.body.featured_stores,
      recommended_item: req.body.recommended_item,
      category: req.body.category,
      driver_approved: req.body.driver_approved,
      banner: req.body.banner,
      popular_search: req.body.popular_search,
      reason: req.body.reason,
      is_super_admin: req.body.is_super_admin,
      name: req.body.name,
      order: req.body.order,
      seller: req.body.seller,
      return: req.body.return,
      brand: req.body.brand,
      categories: req.body.categories,
      currency: req.body.currency,
      delivery_type: req.body.delivery_type,
      delivery_fee: req.body.delivery_fee,
      payment_method: req.body.payment_method,
    };

    // Clone data from validateData
    const updateData = { ...validateData };

    // validate request data from body
    const isValidData = AccProvider.validateCreateData(validateData);
    if (!Helpers.isEmptyObj(isValidData)) {
      return response.badRequest({ data: isValidData });
    }

    // call create func from provider
    const isUpdate = await AccProvider.update(
      {
        updateData: updateData,
        authAccessPolicy: req.is_super_admin,
      },
      req.params.accp_id
    );
    return response.success(isUpdate);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete access policy
export async function deleteAccessPolicy(req, res) {
  const response = new Res(res);
  try {
    const isSet = await QueryBuilder.setActive(
      AccessPolicy,
      req.params.accp_id,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get admin access policy with token
export async function getMyAccessPolicy(req, res) {
  const response = new Res(res);
  try {
    const accp = Admin.findById(req.auth._id)
      .populate({
        path: "access_policy",
      })
      .select("-__v");
    const { access_policy } = await accp;
    return response.success({ data: access_policy });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
