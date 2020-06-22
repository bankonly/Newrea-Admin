/** Controllers */
const Res = require("./response_controller");

/** Helpers */
const { deleteIsActive,isIdExist } = require("../helpers/query_builder");
const { isEmptyObj, validateObjectId } = require("../helpers/Global");

/** Models */
const AccessPolicy = require("../models/access_policy");
const Admin = require("../models/admin");

/** Providers */
const AccProvider = require("../providers/access_policy_provider");

/** get access policy */
export const getAllAccessPolicy = async (req, res) => {
  const response = new Res(res);
  try {
    const accp = await AccProvider._getAccessPolicy();
    return response.success(accp);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get access policy */
export const getAccessPolicy = async (req, res) => {
  const response = new Res(res);
  try {
    if (!validateObjectId(req.params.accp_id)) {
      return response.badRequest({ msg: "invalid access policy id" });
    }
    const accp = await AccProvider._getAccessPolicy(req.params.accp_id);
    return response.success(accp);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** create new access policy */
export const createNewAccessPolicy = async (req, res) => {
  const response = new Res(res);
  try {
    /** create data */
    const validateData = {
      admin: req.body.admin,
      most_popular: req.body.most_popular,
      featured_stores: req.body.featured_stores,
      recommended_item: req.body.recommended_item,
      category: req.body.category,
      driver_approved: req.body.driver_approved,
      banner: req.body.banner,
      popular_screen: req.body.popular_screen,
      reason: req.body.reason,
      is_super_admin: req.body.is_super_admin,
      name: req.body.name,
      order: req.body.order,
      seller: req.body.seller,
      return: req.body.return,
    };

    /** Clone data from validateData */
    const createData = { ...validateData };

    /** validate request data from body */
    const isValidData = AccProvider.validateCreateData(validateData);
    if (!isEmptyObj(isValidData)) {
      return response.badRequest({ data: isValidData });
    }

    /** call create func from provider */
    const isCreated = await AccProvider.newAccessPolicy(
      createData,
      req.is_super_admin
    );
    return response.success(isCreated);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** update access policy */
export const updateAccessPolicy = async (req, res) => {
  const response = new Res(res);
  try {
    /** create data */
    const validateData = {
      admin: req.body.admin,
      most_popular: req.body.most_popular,
      featured_stores: req.body.featured_stores,
      recommended_item: req.body.recommended_item,
      category: req.body.category,
      driver_approved: req.body.driver_approved,
      banner: req.body.banner,
      popular_screen: req.body.popular_screen,
      reason: req.body.reason,
      is_super_admin: req.body.is_super_admin,
      name: req.body.name,
      order: req.body.order,
      seller: req.body.seller,
      return: req.body.return,
    };

    /** Clone data from validateData */
    const updateData = { ...validateData };

    /** validate request data from body */
    const isValidData = AccProvider.validateCreateData(validateData);
    if (!isEmptyObj(isValidData)) {
      return response.badRequest({ data: isValidData });
    }

    /** call create func from provider */
    const isUpdate = await AccProvider._updateAccessPolicy(
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
};

/** delete access policy */
export const deleteAccessPolicy = async (req, res) => {
  const response = new Res(res);
  try {
    const isValid = validateObjectId(req.params.accp_id);

    /** Check validator */
    if (!isEmptyObj(isValid)) return response.badRequest({ data: isValid });

    const isId = await isIdExist(Admin, req.params.admin_id);
    if (!isId || isId.is_active == "in_active") {
      return response.notFound({ msg: "no user" });
    }

    const delAcc = await deleteIsActive(AccessPolicy, req.params.accp_id);
    if (!delAcc) {
      return response.badRequest({ msg: "can not delete" });
    }
    return response.success({ msg: "deleted" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get admin access policy with token */
export const getMyAccessPolicy = async (req, res) => {
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
};
