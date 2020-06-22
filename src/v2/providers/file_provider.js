import multer from "multer";
import fs from "fs";
import uuid from "uuid";
import constant from "../configs/constant";
import sharp from "sharp";
import formidable from "formidable";

/** helpers */
import {
  isEmptyObj,
  isEmpty,
  validateObjectId,
  isString,
  isArray,
} from "../helpers/Global";

/** Controllers */
import Res from "../controllers/default_res_controller";

/** validate image */
export const imageValidate = (imageSize, file) => {
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
};

export const createDirIfNotExist = (path) => {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  } catch (error) {
    return new Error(error);
  }
};

export const resizeImage = ({ size, path, fileName }) => {
  try {
    if (!isArray(size)) {
      return new Error("size should be array");
    }
    var removePath = [];
    for (var i = 0; i < size.length; i++) {
      const newPath = path + size[i] + "x" + size[i] + "/";
      const newFile = newPath + fileName;
      const destination = path + fileName;

      /** check if new dir is not exist */
      createDirIfNotExist(newPath);
      /** store remove path if validate error */
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
};

/** remove one file */
export const removeFile = (path) => {
  try {
    while (true) {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        break;
      }
    }
  } catch (error) {
    return new Error(error);
  }
};

/** remove image */
export const removeFileMany = (path) => {
  try {
    if (!isArray(path)) {
      return new Error("remove path should be array");
    }

    path.forEach((value) => {
      while (true) {
        if (!fs.existsSync(value)) {
          fs.unlink(value);
          break;
        }
        console.log("REMOVED");
      }
    });
  } catch (error) {
    return new Error(error);
  }
};

export const uploadImage = ({
  req,
  path,
  imageSize = [800, 200],
  file,
  fileType = ".jpg",
}) => {
  try {
    /** validate image before save */
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
};
