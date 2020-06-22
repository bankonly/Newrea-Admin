/** Modules */

import ResCtl from "./response_controller";

/** Helpers */
import {
  isString,
  isEmptyObj,
  validateObjectId,
  isEmpty,
} from "../helpers/Global";
import { isIdExist, deleteIsActive } from "../helpers/query_builder";

/** Models */

/** Providers */
import { saveImageExpress } from "../providers/file_provider";

/** Configs */
import constant from "../configs/constant";

/** save most popular */
export const saveBanner = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    return response.success({ data: isCreate });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** update most popular */
export const updateBanner = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    return response.success({ msg: "updated" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get all most popular */
export const getAllBanner = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get most popular */
export const getBanner = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** delete most popular */
export const deleteBanner = async (req, res, next) => {
  /** define response */
  const response = new ResCtl(res);
  try {
    return response.success({ msg: "deleted" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};
