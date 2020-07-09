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
  const paramID = req.params.id;
  try {
    // select logo old name from database
    let foundBrand = await brandModel.findById(paramID).select("logo");
    if (!foundBrand) {
      return response.notFound({
        data: foundBrand,
        msg: `brand id ${paramID} not found`,
      });
    }
    const oldLogoName = foundBrand.logo;
    let newLogoName = "";
    let removeFileStatus = {
      original: "nothing change",
      small: "nothing change",
      big: "nothing change",
    };
    // upload image
    if (req.files.logo) {
      const uploadSttLogo = uploadImage({
        req,
        path: config.imgPath.brand,
        file: req.files.logo,
      });
      if (uploadSttLogo.status && uploadSttLogo.code === 200) {
        newLogoName = uploadSttLogo.data;
        // remove original logo and store the status
        removeFileStatus.original = await removeFile(
          config.imgPath.brand,
          oldLogoName
        );
        // remove small logo and store the status
        removeFileStatus.small = await removeFile(
          `${config.imgPath.brand}/200x200`,
          oldLogoName
        );
        // remove big logo and store the status
        removeFileStatus.big = await removeFile(
          `${config.imgPath.brand}/800x800`,
          oldLogoName
        );
      }
    } else {
      return response.badRequest({ msg: "logo is require" });
    }
    foundBrand.logo = newLogoName;
    if (await foundBrand.save()) {
      return response.success({
        msg: "update brand logo successfully",
        data: [foundBrand, { remove_file_status: removeFileStatus }],
      });
    } else {
      return response.somethingWrong({});
    }
  } catch (ex) {
    return response.somethingWrong({ error: ex });
  }
};
