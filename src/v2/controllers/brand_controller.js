import Res from "./response_controller";
const config = require("./../configs/constant");

const brandModel = require("../models/brand");

const { uploadImage, removeFile } = require("./../providers/file_provider");

// get all brand
exports.getBrands = async (req, res) => {
  const response = new Res(res);
  try {
    const foundBand = await brandModel.find();
    if (foundBand.length > 0) {
      response.success({ data: foundBand });
    } else {
      response.success({ data: foundBand, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
// create brand
exports.createBrand = async (req, res) => {
  const response = new Res(res);
  if (!req.files.logo) {
    return response.badRequest({ msg: "logo is require" });
  }
  // upload images
  const uploadSttLogo = uploadImage({
    req,
    path: config.imgPath.brand,
    file: req.files.logo,
  });
  if (uploadSttLogo.status && uploadSttLogo.code === 200) {
    req.body.logo = uploadSttLogo.data;
  } else {
    throw new Error("can not upload image");
  }
  // end upload image
  const reqBody = req.body;
  try {
    const newbrand = new brandModel(reqBody);
    const createKeyword = await newbrand.save();
    if (createKeyword) {
      response.success({ data: createKeyword });
    } else {
      throw new Error();
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

// update/delete/restore brand
exports.updateBrand = async (req, res) => {
  const response = new Res(res);
  const paramID = req.params.id;
  const reqBody = req.body;
  try {
    let foundBrand = await brandModel.findById(paramID);
    if (!foundBrand) {
      return response.notFound({
        data: foundBrand,
        msg: "brand not found",
      });
    }
    foundBrand.set(reqBody);
    if (await foundBrand.save()) {
      return response.success({
        data: foundBrand,
        msg: "update brand successfully",
      });
    } else {
      return response.somethingWrong({});
    }
  } catch (ex) {
    return response.somethingWrong({ error: ex });
  }
};

// update brand logo
exports.updateBrandLogo = async (req, res) => {
  const response = new Res(res);
  // there is image request?
  if (!req.files.logo) {
    return response.badRequest({ msg: "logo is require" });
  }
  const paramID = req.params.id;
  const reqBody = req.body;
  try {
    let foundBrand = await brandModel.findById(paramID);
    if (!foundBrand) {
      return response.notFound({
        data: foundBrand,
        msg: "brand not found",
      });
    }
    foundBrand.set(reqBody);
    if (await foundBrand.save()) {
      return response.success({
        data: foundBrand,
        msg: "update brand successfully",
      });
    } else {
      return response.somethingWrong({});
    }
  } catch (ex) {
    return response.somethingWrong({ error: ex });
  }
};
