// Files Import Models,Controller ...
const Helpers = require("../helpers/Global");
const QB = require("../helpers/query_builder");
const FileProvider = require("../providers/file_provider");
const ResCtl = require("./response_controller");
const MostProvider = require("../providers/most_popular_provider");
const constant = require("../configs/constant");
const MostPopular = require("../models/most_popular");
const { func } = require("@hapi/joi");

// save most popular
export async function saveMostPopular(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    const isValid = MostProvider.validateSaveData(req, true);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    // validate image and body data
    const isUpload = FileProvider.uploadImage({
      path: constant.imgPath.most_popular,
      file: req.files.img,
      req: req,
    });

    if (!isUpload.status) return response.badRequest(isUpload);

    // create new data
    const isCreate = await MostPopular.create(req.body);
    if (!isCreate) return response.badRequest({ msg: "can not create" });
    return response.success({ data: isCreate });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update most popular
export async function updateMostPopular(req, res) {
  // define response
  const response = new ResCtl(res);
  var removeImgPath = null;
  try {
    if (!Helpers.validateObjectId(req.params.mos_id)) {
      return response.badRequest({ msg: "invalid most popular id" });
    }

    const isValid = MostProvider.validateSaveData(req, false);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    const isId = await QB.isIdExist(MostPopular, req.params.mos_id);
    if (isId == null) return response.notFound({ msg: "id not exist" });

    // validate image and body data
    if (req.files) {
      if (!req.files.img) {
        return response.badRequest({ msg: "img is required" });
      }
      removeImgPath = isId.img;
      const isUpload = FileProvider.uploadImage({
        path: constant.imgPath.most_popular,
        file: req.files.img,
        req: req,
      });

      if (!isUpload.status) return response.badRequest(isUpload);
    }
    // create new data
    const isUpdate = await MostPopular.updateOne(
      { _id: req.params.mos_id },
      { $set: req.body }
    );
    if (!isUpdate) return response.badRequest({ msg: "can not update" });

    // remove img if is not null
    if (removeImgPath !== null) {
      FileProvider.removeFileMany({
        path: constant.imgPath.most_popular,
        fileName: removeImgPath,
      });
    }
    return response.success({ msg: "updated" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get all most popular
export async function getAllMostPopular(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    const most_data = await MostProvider.fetch(null, req.is_super_admin);
    return response.success(most_data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get most popular
export async function getMostPopular(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    const mos_id = req.params.mos_id;
    if (!Helpers.isEmpty(mos_id)) {
      return response.badRequest({ msg: "mos_id is required" });
    }

    const most_data = await MostProvider.fetch(mos_id, req.is_super_admin);
    return response.success(most_data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete most popular
export async function deleteMostPopular(req, res) {
  // define response
  const response = new ResCtl(res);
  try {
    const isSet = await QB.setActive(
      MostPopular,
      req.params.mos_id,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
