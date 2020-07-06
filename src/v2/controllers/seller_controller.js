import Res from "./response_controller";

const sellerModel = require("../models/seller");

const crypto = require("crypto-js");

const config = require("./../configs/constant");

const { uploadImage, removeFile } = require("./../providers/file_provider");

// get all sellers
exports.getSellerList = async (req, res) => {
  const response = new Res(res);
  try {
    const sellers = await sellerModel
      .find()
      .populate(["category_id", "delivery_fee_option_id"]);
    if (sellers.length > 0) {
      response.success({ data: sellers });
    } else {
      response.success({ data: sellers, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
// get seller by ID
exports.findSellerByID = async (req, res) => {
  const response = new Res(res);
  const sellerID = req.params.sellerID;
  try {
    const sellers = await sellerModel
      .findById(sellerID)
      .populate(["category_id", "delivery_fee_option_id"]);
    if (sellers) {
      response.success({ data: sellers });
    } else {
      response.success({ data: sellers, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
// create new  seller
exports.createSeller = async (req, res) => {
  const response = new Res(res);

  // upload images
  const uploadSttImg = uploadImage({
    req,
    path: config.imgPath.seller.profile,
    file: req.files.img,
  });
  if (uploadSttImg.status && uploadSttImg.code === 200) {
    req.body.img = uploadSttImg.data;
  } else {
    throw new Error("can not upload image cover");
  }
  const uploadSttLogo = uploadImage({
    req,
    path: config.imgPath.seller.logo,
    file: req.files.logo,
  });
  if (uploadSttLogo.status && uploadSttLogo.code === 200) {
    req.body.logo = uploadSttLogo.data;
  } else {
    throw new Error("can not upload image logo");
  }
  // end upload image

  // encryp password
  const SECRET_KEY_PASS = process.env.SECRET_KEY_PASS;
  const sellerData = req.body;
  const encriptedPass = crypto.AES.encrypt(
    JSON.stringify(req.body.pass),
    SECRET_KEY_PASS
  );
  req.body.pass = encriptedPass;
  try {
    const newSeller = new sellerModel(sellerData);
    const savedSeller = await newSeller.save();
    if (savedSeller) {
      response.created({
        data: savedSeller,
        msg: "create seller successfully",
      });
    } else {
      response.success({ msg: "create seller failed" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

// disable  seller
exports.enableDisableSeller = async (req, res) => {
  const response = new Res(res);
  const sellerID = req.params.sellerID;
  try {
    const foundSeller = await sellerModel.findById(sellerID);
    if (!foundSeller) {
      return response.notFound({ data: sellerID, msg: "seller not found" });
    }
    foundSeller.set(req.body);
    if (await foundSeller.save()) {
      return response.success({ data: foundSeller });
    } else {
      return response.somethingWrong({});
    }
  } catch (ex) {
    return response.somethingWrong({ error: ex });
  }
};

// update  seller
exports.updateSeller = async (req, res) => {
  const response = new Res(res);
  const sellerID = req.params.sellerID;
  const sellerData = req.body;
  try {
    let foundSeller = await sellerModel.findById(sellerID);
    if (!foundSeller) {
      return response.notFound({ data: sellerID, msg: "seller not found" });
    }
    foundSeller.set(sellerData);
    if (await foundSeller.save()) {
      return response.success({
        data: foundSeller,
        msg: "update seller successfully",
      });
    } else {
      return response.somethingWrong({});
    }
  } catch (ex) {
    return response.somethingWrong({ error: ex });
  }
};

// edit  seller images
exports.updateSellerImages = async (req, res) => {
  const response = new Res(res);
  const acceptKey = ["img", "logo"];
  const fileKeys = Object.keys(req.files);
  let invalidKey = [];
  fileKeys.map((e) => {
    if (!acceptKey.includes(e)) {
      invalidKey.push(`not allowed key ${e}`);
    }
  });

  if (invalidKey.length > 0) {
    return response.badRequest({ data: invalidKey, msg: "not allowed keys" });
  }
  const sellerID = req.params.sellerID;
  try {
    let foundSeller = await sellerModel.findById(sellerID).select("img logo");
    if (!foundSeller) {
      return response.notFound({ data: sellerID, msg: "seller not found" });
    }

    // get old image name
    const imgOldName = foundSeller.img;
    const logoOldName = foundSeller.logo;
    let newImg = foundSeller.img;
    let newLogo = foundSeller.logo;

    let removeFileStatus = {
      logo: {
        small: "not upload new file",
        big: "not upload new file",
        original: "not upload new file",
      },
      img: {
        small: "not upload new file",
        big: "not upload new file",
        original: "not upload new file",
      },
    };
    // upload image cover
    if (req.files.img) {
      const uploadSttImg = uploadImage({
        req,
        path: config.imgPath.seller.profile,
        file: req.files.img,
      });
      if (uploadSttImg.status && uploadSttImg.code === 200) {
        newImg = uploadSttImg.data;
        // remove old file
        removeFileStatus.img.original = await removeFile(
          config.imgPath.seller.profile,
          imgOldName
        );
        removeFileStatus.img.small = await removeFile(
          `${config.imgPath.seller.profile}200x200/`,
          imgOldName
        );
        removeFileStatus.img.big = await removeFile(
          `${config.imgPath.seller.profile}800x800/`,
          imgOldName
        );
      }
    }
    // upload logo
    if (req.files.logo) {
      const uploadSttLogo = uploadImage({
        req,
        path: config.imgPath.seller.logo,
        file: req.files.logo,
      });
      if (uploadSttLogo.status && uploadSttLogo.code === 200) {
        newLogo = uploadSttLogo.data;
        // remove old file
        removeFileStatus.logo.original = await removeFile(
          config.imgPath.seller.logo,
          logoOldName
        );
        removeFileStatus.logo.small = await removeFile(
          `${config.imgPath.seller.logo}200x200/`,
          logoOldName
        );
        removeFileStatus.logo.big = await removeFile(
          `${config.imgPath.seller.logo}800x800/`,
          logoOldName
        );
      }
    }

    // end upload image

    // save image name to database
    foundSeller.set({
      img: newImg,
      logo: newLogo,
    });
    if (await foundSeller.save()) {
      return response.success({
        data: [foundSeller, removeFileStatus],
        msg: "update seller images successfully",
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
  const sellerID = req.params.sellerID;
  try {
    let foundSeller = await sellerModel.findById(sellerID);
    if (!foundSeller) {
      return response.notFound({ data: sellerID, msg: "seller not found" });
    }
    // encryp password
    const SECRET_KEY_PASS = process.env.SECRET_KEY_PASS;
    const encriptedPass = crypto.AES.encrypt(
      JSON.stringify(req.body.password),
      SECRET_KEY_PASS
    );
    foundSeller.pass = encriptedPass;
    if (await foundSeller.save()) {
      return response.success({
        data: foundSeller,
        msg: "reset password seller successfully",
      });
    } else {
      return response.somethingWrong({});
    }
  } catch (ex) {
    return response.somethingWrong({ error: ex });
  }
};
