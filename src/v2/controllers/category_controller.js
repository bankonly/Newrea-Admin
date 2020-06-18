/** Modules */
import sharp from "sharp";
import fs from "fs";

import ResCtl from "./response_controller";

/** Helpers */
import { isString } from "../helpers/Global";

/** Providers */
import { uploadImage,singleImgUpload } from "../providers/file_provider";

/** save catagory */
export const saveCategory = (req, res, next) => {
  /** define response */
  const response = ResCtl(res);
  try {
    const upload = uploadImage("./img")
    /** upload */
    upload.single("catImage")
    return response.success({ data: req.file });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** update catagory */
export const updateCategory = (req, res, next) => {
  /** define response */
  const response = ResCtl(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get all catagory */
export const getAllCategory = (req, res, next) => {
  /** define response */
  const response = ResCtl(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get catagory */
export const getCategory = (req, res, next) => {
  /** define response */
  const response = ResCtl(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** delete catagory */
export const deleteCategory = (req, res, next) => {
  /** define response */
  const response = ResCtl(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};
