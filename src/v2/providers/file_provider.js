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
        .resize(size[i], size[i])
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
export function removeFileMany({ path, fileName, subFolder = [800, 200] }) {
  try {
    if (!Helpers.isArray(subFolder)) {
      return new Error("remove path should be array");
    }

    if (fs.existsSync(path + fileName)) {
      console.log("me der");
      fs.unlinkSync(path + fileName);
      for (var i = 0; i < subFolder.length; i++) {
        const destination =
          path + subFolder[i] + "x" + subFolder[i] + "/" + fileName;
        if (fs.existsSync(destination)) {
          fs.unlinkSync(destination);
        }
      }
    }
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}

// remove image all size and original images
/**
 *
 *
 * @export
 * @param {*} folderPath
 * @param {*} fileName
 */
export function removeFile(folderPath, fileName) {
  return new Promise((resolve, rejects) => {
    fs.unlink(`${folderPath}/${fileName}`, (err) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
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

    if (file.size > constant.image_size_allow) {
      return Res.badRequest({ msg: "file is to large" });
    }

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

export const uploadImageMany = ({
  req,
  path,
  imageSize = [800, 200],
  file,
  fileType = "jpg",
  size = 5,
}) => {
  try {
    if (!Helpers.isArray(file)) {
      return Res.badRequest({ msg: "file should be array" });
    }

    if (file.length > size) {
      return Res.badRequest({ msg: "too much file allow only " + size });
    }

    let imgList = [];
    for (let i = 0; i < file.length; i++) {
      if (file[i].size > constant.image_size_allow) {
        return Res.badRequest({ msg: "file is to large" });
      }

      // validate image before save
      const validateImage = imageValidate(imageSize, file);
      if (!validateImage.status) return validateImage;

      if (
        !constant.image_type_accept.includes(file[i].mimetype.split("/")[1])
      ) {
        return Res.badRequest({ msg: "img type not accepted" });
      }
      const fileName = uuid() + Date.now() + "." + fileType;
      createDirIfNotExist(path);
      fs.writeFileSync(path + fileName, file[i].data);
      resizeImage({
        size: imageSize,
        path: path,
        fileName: fileName,
      });
      imgList.push(fileName);
    }
    if (imgList.length > 0) {
      return Res.success({ data: imgList, msg: "img created" });
    }
    return Res.badRequest({ msg: "img upload failed" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};

export const fileUpload = ({
  req,
  path,
  imageSize = [800, 200],
  file,
  fileType = "jpg",
  size = 5,
}) => {
  const option = { path, req, imageSize, file, fileType, size };
  if (file.length > 1) {
    return uploadImageMany(option);
  }
  delete option.size;
  return uploadImage(option);
};
