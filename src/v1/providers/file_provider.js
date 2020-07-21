const multer = require("multer");
const fs = require("fs");
const uuid = require("uuid");
const constant = require("../configs/constant");
const sharp = require("sharp");
const formidable = require("formidable");
const Helpers = require("../helpers/utils");
const response = require("../providers/response_provider");

// validate image
export function imageValidate(imageSize, file) {
  try {
    if (!Array.isArray(imageSize)) {
      return response.badRequest({ msg: "img is should be array" });
    }

    for (var i = 0; i < imageSize.length; i++) {
      if (typeof imageSize[i] !== "number") {
        return response.badRequest({ msg: "img is should be number" });
      }
    }
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
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

// remove one file
export function removeFilesMany({
  path,
  fileName = [],
  subFolder = [800, 200],
}) {
  try {
    if (!Helpers.isArray(subFolder) && !Helpers.isArray(fileName)) {
      return new Error("remove path should be array");
    }
    for (let i = 0; i < fileName.length; i++) {
      if (fs.existsSync(path + fileName[i])) {
        fs.unlinkSync(path + fileName[i]);
        for (var f = 0; f < subFolder.length; f++) {
          const destination =
            path + subFolder[f] + "x" + subFolder[f] + "/" + fileName[i];
          if (fs.existsSync(destination)) {
            fs.unlinkSync(destination);
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}

export function removeFile(folderPath, fileName) {
  return new Promise((resolve, rejects) => {
    fs.unlink(`${folderPath}${fileName}`, (err) => {
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
  fileType = "jpg",
}) {
  try {
    // validate image before save
    const validateImage = imageValidate(imageSize, file);
    if (!validateImage.status) return validateImage;

    if (file.size > constant.image_size_allow) {
      return response.badRequest({ msg: "file is to large" });
    }

    if (!constant.image_type_accept.includes(file.mimetype.split("/")[1])) {
      return response.badRequest({ msg: "img type not accepted" });
    }
    const fileName = uuid() + Date.now() + "." + fileType;
    req.body.img = fileName;
    createDirIfNotExist(path);
    fs.writeFileSync(path + fileName, file.data);
    const resizePath = resizeImage({
      size: imageSize,
      path: path,
      fileName: fileName,
    });

    return response.success({ data: fileName, msg: "img created" });
  } catch (error) {
    return response.somethingWrong({ error: error });
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
      return response.badRequest({ msg: "file should be array" });
    }

    if (file.length > size) {
      return response.badRequest({ msg: "too much file allow only " + size });
    }

    let imgList = [];
    for (let i = 0; i < file.length; i++) {
      if (file[i].size > constant.image_size_allow) {
        return response.badRequest({ msg: "file is to large" });
      }

      // validate image before save
      const validateImage = imageValidate(imageSize, file);
      if (!validateImage.status) return validateImage;

      if (
        !constant.image_type_accept.includes(file[i].mimetype.split("/")[1])
      ) {
        return response.badRequest({ msg: "img type not accepted" });
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
      return response.success({ data: imgList, msg: "img created" });
    }
    return response.badRequest({ msg: "img upload failed" });
  } catch (error) {
    return response.somethingWrong({ error: error });
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
  if (Helpers.isArray(file)) {
    return uploadImageMany(option);
  }
  delete option.size;
  return uploadImage(option);
};

export const remove = ({ path, fileName, subFolder = [800, 200] }) => {
  const option = { path, fileName, subFolder };
  if (Helpers.isArray(fileName)) {
    removeFilesMany(option);
  } else {
    removeFileMany(option);
  }
};