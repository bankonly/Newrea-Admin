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
export const imageValidate = (imageSize, field) => {
  try {
    if (!Array.isArray(imageSize)) {
      return Res.badRequest({ msg: "imageSize is should be array" });
    }

    for (var i = 0; i < imageSize.length; i++) {
      if (typeof imageSize[i] !== "number") {
        return Res.badRequest({ msg: "imageSize is should be number" });
      }
    }

    if (!isString(field))
      return Res.badRequest({ msg: "image is required as string" });

    return Res.success({});
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};

/** single image upload */
export const uploadImage = async ({
  path,
  field,
  req,
  res,
  imageSize = [800, 200],
  fileType = ".jpg",
}) => {
  try {
    /** validate image before save */
    const validateImage = imageValidate(imageSize, field);
    if (!validateImage.status) return validateImage;

    /** check if path exist and create */
    createDirIfNotExist(path);

    /** save image path for single file */
    var imgPath = null;
    var filenameSingle = null;
    var fullImgPath = null;
    var removePath = [];
    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, path);
      },
      filename: function (req, file, callback) {
        const filename = uuid() + Date.now() + fileType;
        filenameSingle = filename;
        callback(null, filename);
      },
    });

    /** store old path or resize */
    fullImgPath = imgPath + filenameSingle;
    const upload = multer({
      storage: storage,
      fileFilter: function (req, file, callback) {
        if (!constant.image_type_accept.includes(file.mimetype.split("/")[1])) {
          callback(new Error("image type is not allow"), false);
        }
        callback(null, true);
      },
      limits: {
        files: 1,
        fileSize: constant.image_size_allow,
      },
    }).single(field);

    return await new Promise((resolve, reject) => {
      upload(req, res, async (err) => {
        /** Handle Error */
        if (err) {
          return resolve(Res.badRequest({ msg: err.message }));
        }
        if (err instanceof multer.MulterError) {
          return resolve(Res.badRequest({ msg: err.message }));
        }

        const oldPath = path + filenameSingle;

        /** resize image */
        const resizePath = resizeImage({
          size: imageSize,
          path: path,
          fileName: filenameSingle,
        });

        /** store remove path if validate error */
        removePath.push(resizePath);
        removePath.push(removePath[0].push(oldPath));
        req.body.img = filenameSingle;
        req.body.removePathIfError = removePath[0];
        return resolve(Res.success({ data: req.body }));
      });
    });
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

export const resizeImage = ({ size, path, newPath, fileName }) => {
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

/** single image upload */
export const uploadImageMany = async ({
  path,
  field,
  req,
  res,
  imageSize = [800, 200],
  fileType = ".jpg",
  maxUpload = 2,
}) => {
  try {
    /** validate image before save */
    const validateImage = imageValidate(imageSize, field);
    if (!validateImage.status) return validateImage;

    /** check if path exist and create */
    createDirIfNotExist(path);

    /** save image path for single file */
    var imgPath = null;
    var fullImgPath = null;
    var removePath = [];
    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, path);
      },
      filename: function (req, file, callback) {
        const filename = uuid() + Date.now() + fileType;
        callback(null, filename);
      },
    });

    const upload = multer({
      storage: storage,
      fileFilter: function (req, file, callback) {
        if (!constant.image_type_accept.includes(file.mimetype.split("/")[1])) {
          callback(new Error("image type is not allow"), false);
        }
        callback(null, true);
      },
      limits: {
        files: maxUpload,
        fileSize: constant.image_size_allow,
      },
    }).array(field, maxUpload);

    return await new Promise((resolve, reject) => {
      upload(req, res, async (err) => {
        /** Handle Error */
        if (err) {
          return resolve(Res.badRequest({ msg: err.message }));
        }
        if (err instanceof multer.MulterError) {
          return resolve(Res.badRequest({ msg: err.message }));
        }

        var removeOldPath = [];
        for (var i = 0; i < req.files.length; i++) {
          const file = req.files[i];
          const oldPath = path + file.filename;
          removeOldPath.push(oldPath);
          /** resize image */
          const resizePath = resizeImage({
            size: imageSize,
            path: path,
            fileName: file.filename,
          });

          /** store remove path if validate error */
          removePath.push(resizePath[0]);
          removePath.push(oldPath);
          // req.body.img = file.filename;
        }

        req.body.removePathIfError = removePath;
        console.log(removeOldPath);
        removeOldPath.forEach((value) => {
          removeFile(value);
        });
        resolve(Res.success({ data: req.body }));
      });
    });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};

export const saveImageExpress = ({ path, imageSize = [800, 200], file }) => {
  console.log(file)
};
