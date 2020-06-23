const multer = require("multer");
const fs = require("fs");
const uuid = require("uuid");
const constant = require("../configs/constant");
const sharp = require("sharp");
const formidable = require("formidable");
const Helpers = require("../helpers/Global");

// Controllers
const Res = require("../controllers/default_res_controller");

// validate image
export function imageValidate(imageSize, file) {
  try {
    if (!Array.isArray(imageSize)) {
      return Res.badRequest({ msg: "img is should be array" });
    }

    for (var i = 0; i < imageSize.length; i++) {
      if (typeof imageSize[i] !== "number") {
        return Res.badRequest({ msg: "img is should be number" });
      }
    }
    return Res.success({});
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

export function createDirIfNotExist(path) {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  } catch (error) {
    return new Error(error);
  }
}

export function resizeImage({ size, path, fileName }) {
  try {
    if (!Helpers.isArray(size)) {
      return new Error("size should be array");
    }
    var removePath = [];
    for (var i = 0; i < size.length; i++) {
      const newPath = path + size[i] + "x" + size[i] + "/";
      const newFile = newPath + fileName;
      const destination = path + fileName;

      // check if new dir is not exist
      createDirIfNotExist(newPath);
      // store remove path if validate error
      sharp(destination)
        .resize(size[i])
        .toFile(newFile, (e, info) => {
          if (e) {
            return new Error(e.message);
          }
        });
      removePath.push(newFile);
    }
    return removePath;
  } catch (error) {
    return new Error(error);
  }
}

// remove one file
export function removeFile(path, fileName, subFolder = [800, 200]) {
  try {
    if (!isArray(subFolder)) {
      return new Error("remove path should be array");
    }
    fs.unlinkSync(path + fileName);
    for (var i = 0; i < subFolder.length; i++) {
      fs.unlinkSync(path + subFolder[i] + "x" + subFolder[i] + "/" + fileName);
    }
  } catch (error) {
    return new Error(error);
  }
}

export function uploadImage({
  req,
  path,
  imageSize = [800, 200],
  file,
  fileType = ".jpg",
}) {
  try {
    // validate image before save
    const validateImage = imageValidate(imageSize, file);
    if (!validateImage.status) return validateImage;

    if (!constant.image_type_accept.includes(file.mimetype.split("/")[1])) {
      return Res.badRequest({ msg: "img type not accepted" });
    }
    const fileName = uuid() + Date.now() + fileType;
    req.body.img = fileName;
    createDirIfNotExist(path);
    fs.writeFileSync(path + fileName, file.data);
    const resizePath = resizeImage({
      size: imageSize,
      path: path,
      fileName: fileName,
    });

    return Res.success({ data: fileName, msg: "img created" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}
