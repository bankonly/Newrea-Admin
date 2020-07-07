import Res from "./response_controller";
const config = require("./../configs/constant");
const crypto = require("crypto-js");

const driverModel = require("../models/driverModel");

const { uploadImage, removeFile } = require("./../providers/file_provider");

// get all driver
exports.getDrivers = async (req, res) => {
  const response = new Res(res);
  try {
    const foundDrivers = await driverModel.find();
    if (foundDrivers.length > 0) {
      response.success({ data: foundDrivers });
    } else {
      response.success({ data: foundDrivers, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
// create driver
exports.createDriver = async (req, res) => {
  const response = new Res(res);
  if (!req.files.img) {
    return response.badRequest({ msg: "image is require" });
  }
  // upload images
  const uploadSttImg = uploadImage({
    req,
    path: config.imgPath.driver,
    file: req.files.img,
  });
  if (uploadSttImg.status && uploadSttImg.code === 200) {
    req.body.img = uploadSttImg.data;
  } else {
    throw new Error("can not upload image");
  }
  // end upload image

  // encryp password
  const reqBody = req.body;
  const decrypPassword = reqBody.password;
  const SECRET_KEY_PASS_DRIVER = process.env.SECRET_KEY_PASS_DRIVER;
  const encriptedPass = crypto.AES.encrypt(
    JSON.stringify(reqBody.password),
    SECRET_KEY_PASS_DRIVER
  );
  reqBody.password = encriptedPass;
  try {
    const newDriver = new driverModel(reqBody);
    const createdDriver = await newDriver.save();
    if (createdDriver) {
      createdDriver.password = decrypPassword;
      response.success({ data: createdDriver });
    } else {
      throw new Error();
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

// update/delete/restore driver
exports.updateDriver = async (req, res) => {
  const response = new Res(res);
  const paramID = req.params.id;
  const reqBody = req.body;
  try {
    let foundDriver = await driverModel.findById(paramID);
    if (!foundDriver) {
      return response.notFound({
        data: foundDriver,
        msg: `driver id ${paramID} not found`,
      });
    }
    foundDriver.set(reqBody);
    if (await foundDriver.save()) {
      return response.success({
        data: foundDriver,
        msg: "update driver successfully",
      });
    } else {
      return response.somethingWrong({});
    }
  } catch (ex) {
    return response.somethingWrong({ error: ex });
  }
};

// update driver image
exports.updateDriverImg = async (req, res) => {
  const response = new Res(res);
  const paramID = req.params.id;
  try {
    // select logo old name from database
    let foundDriver = await driverModel.findById(paramID).select("img");
    if (!foundDriver) {
      return response.notFound({
        data: foundDriver,
        msg: `driver id ${paramID} not found`,
      });
    }
    const oldLogoName = foundDriver.img;
    let newImgName = "";
    let removeFileStatus = {
      original: "nothing change",
      small: "nothing change",
      big: "nothing change",
    };
    // upload image
    if (req.files.img) {
      const uploadSttImg = uploadImage({
        req,
        path: config.imgPath.driver,
        file: req.files.img,
      });
      if (uploadSttImg.status && uploadSttImg.code === 200) {
        newImgName = uploadSttImg.data;
        // remove original logo and store the status
        removeFileStatus.original = await removeFile(
          config.imgPath.driver,
          oldLogoName
        );
        // remove small logo and store the status
        removeFileStatus.small = await removeFile(
          `${config.imgPath.driver}/200x200`,
          oldLogoName
        );
        // remove big logo and store the status
        removeFileStatus.big = await removeFile(
          `${config.imgPath.driver}/800x800`,
          oldLogoName
        );
      }
    } else {
      return response.badRequest({ msg: "img is require" });
    }
    foundDriver.img = newImgName;
    if (await foundDriver.save()) {
      return response.success({
        msg: "update brand logo successfully",
        data: [foundDriver, { remove_file_status: removeFileStatus }],
      });
    } else {
      return response.somethingWrong({});
    }
  } catch (ex) {
    return response.somethingWrong({ error: ex });
  }
};
// reset Password
exports.resetPassword = async (req, res) => {
  const response = new Res(res);
  const driverID = req.params.id;
  try {
    let foundDriver = await driverModel.findById(driverID);
    if (!foundDriver) {
      return response.notFound({ data: driverID, msg: "driver not found" });
    }
    // encryp password
    const SECRET_KEY_PASS_DRIVER = process.env.SECRET_KEY_PASS_DRIVER;
    const encriptedPass = crypto.AES.encrypt(
      JSON.stringify(req.body.password),
      SECRET_KEY_PASS_DRIVER
    );
    foundDriver.password = encriptedPass;
    if (await foundDriver.save()) {
      return response.success({
        data: foundDriver,
        msg: "reset password driver successfully",
      });
    } else {
      return response.somethingWrong({});
    }
  } catch (ex) {
    return response.somethingWrong({ error: ex });
  }
};
