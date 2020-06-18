import multer from "multer";
import fs from "fs";
import uuid from "uuid";
import constant from "../configs/constant";

/** Controllers */
import Res from "../controllers/default_res_controller";

export const uploadImage = (path, method = "single") => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      req.fileError = false;
      const savePath = path;
      if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath);
      }
      req.fileSavePath = savePath;
      cb(null, savePath);
    },
    filename: function (req, file, cb) {
      req.fileError = false;
      if (!constant.image_type_accept.includes(file.mimetype)) {
        req.fileError = true;
        cb({ error: "error" }, fileName);
      }
      const fileName = uuid() + Date.now() + ".jpg";
      console.log(file);
      cb({ error: "error" }, fileName);
    },
  });

  return multer({ storage: storage });
};

/** single image upload */
export const singleImgUpload = (path, fieldName) => {
  try {
    return multer({ dest: path }).single(fieldName);
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};
