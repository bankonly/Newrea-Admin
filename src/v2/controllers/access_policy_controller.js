/** Controllers */
import Res from "./response_controller";

/** Helpers */
import { isEmptyObj, validateObjectId } from "../helpers/Global";

/** Models */
import { AccessPolicy } from "../models/access_policy";
import { Admin } from "../models/admin";

/** Providers */
import {
  validateCreateData,
  newAccessPolicy,
  _updateAccessPolicy,
  _deleteAccessPolicy,
  _getAccessPolicy,
} from "../providers/access_policy_provider";
import { cm_delete } from "../providers/common_provider";

/** get access policy */
export const getAllAccessPolicy = async (req, res) => {
  const response = Res(res);
  try {
    const accp = await _getAccessPolicy();
    return response.success(accp);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get access policy */
export const getAccessPolicy = async (req, res) => {
  const response = Res(res);
  try {
    if (!validateObjectId(req.params.accp_id)) {
      return response.badRequest({ msg: "invalid access policy id" });
    }
    const accp = await _getAccessPolicy(req.params.accp_id);
    return response.success(accp);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** create new access policy */
export const createNewAccessPolicy = async (req, res) => {
  const response = Res(res);
  try {
    /** create data */
    const validateData = {
      admin: req.body.admin,
      most_popular: req.body.most_popular,
      featured_stores: req.body.featured_stores,
      recommended_item: req.body.recommended_item,
      catagory: req.body.catagory,
      driver_approved: req.body.driver_approved,
      banner: req.body.banner,
      popular_screen: req.body.popular_screen,
      reason: req.body.reason,
      is_super_admin: req.body.is_super_admin,
      name: req.body.name,
    };

    /** Clone data from validateData */
    const createData = { ...validateData };

    /** validate request data from body */
    const isValidData = validateCreateData(validateData);
    if (!isEmptyObj(isValidData)) {
      return response.badRequest({ data: isValidData });
    }

    /** call create func from provider */
    const isCreated = await newAccessPolicy(createData, req.is_super_admin);
    return response.success(isCreated);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** update access policy */
export const updateAccessPolicy = async (req, res) => {
  const response = Res(res);
  try {
    /** create data */
    const validateData = {
      admin: req.body.admin,
      most_popular: req.body.most_popular,
      featured_stores: req.body.featured_stores,
      recommended_item: req.body.recommended_item,
      catagory: req.body.catagory,
      driver_approved: req.body.driver_approved,
      banner: req.body.banner,
      popular_screen: req.body.popular_screen,
      reason: req.body.reason,
      is_super_admin: req.body.is_super_admin,
      name: req.body.name,
    };

    /** Clone data from validateData */
    const updateData = { ...validateData };

    /** validate request data from body */
    const isValidData = validateCreateData(validateData);
    if (!isEmptyObj(isValidData)) {
      return response.badRequest({ data: isValidData });
    }

    /** call create func from provider */
    const isUpdate = await _updateAccessPolicy(
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
  const response = Res(res);
  try {
    const delAcc = await _deleteAccessPolicy(
      req.params.accp_id,
      req.is_super_admin
    );
    return response.success(delAcc);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get admin access policy with token */
export const getMyAccessPolicy = async (req, res) => {
  const response = Res(res);
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
