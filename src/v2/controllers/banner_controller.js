const Res = require("./response_controller");
const FileProvider = require("../providers/file_provider");
const BannerProvider = require("../providers/banner_provider");
const Helpers = require("../helpers/Global");
const constant = require("../configs/constant");
const QB = require("../helpers/query_builder");
const Banner = require("../models/main_banner");

// save most popular
export async function saveBanner(req, res) {
  // define response
  const response = new Res(res);
  try {
    // validate save data
    const isValid = BannerProvider.validate_add(req);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    const isName = await Banner.findOne({ name: req.body.name });
    if (isName) return response.duplicated({ data: isName.name });

    let option = {
      req: req,
      path: constant.imgPath.banner,
      file: req.files.img,
    };

    const isUpload = FileProvider.fileUpload(option);

    // upload img
    if (!isUpload.status) {
      return response.badRequest(isUpload);
    }

    const saveData = {
      img: isUpload.data,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      name: req.body.name,
    };
    const isSave = await Banner.create(saveData);
    if (!isSave) return response.badRequest({ msg: "can not update" });
    return response.success({ data: isSave });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update most popular
export async function updateBanner(req, res) {
  // define response
  const response = new Res(res);
  try {
    if (!Helpers.validateObjectId(req.params.banner_id)) {
      return response.badRequest({ msg: "invalid Id" });
    }
    // validate save data
    const isValid = BannerProvider.validate_add(req, false);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }
    var saveData = {
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      name: req.body.name,
    };

    const isName = await Banner.findOne({ name: req.body.name });
    const isId = await QB.isIdActive(Banner, req.params.banner_id);

    if (!isId) return response.notFound({ msg: "no data" });

    if (isName && isId.name !== isName.name)
      return response.duplicated({ data: isName.name });

    // upload img
    if (Helpers.isFile(req.files, "img")) {
      let option = {
        req: req,
        path: constant.imgPath.banner,
        file: req.files.img
      };

      const isUpload = FileProvider.fileUpload(option);

      if (!isUpload.status) {
        return response.badRequest(isUpload);
      }
      FileProvider.remove({
        path: constant.imgPath.banner,
        fileName: isId.img,
      });

      isId.img = isUpload.data;
    }

    isId.start_date = req.body.start_date;
    isId.end_date = req.body.end_date;
    isId.name = saveData.name;

    if (!isId.save()) return response.badRequest({ msg: "can not update" });
    return response.success({ data: isId });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get all most popular
export async function getAllBanner(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: Banner,
      adminType: req.is_super_admin,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get most popular
export async function getBanner(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: Banner,
      adminType: req.is_super_admin,
      id: req.params.banner_id,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete most popular
export async function deleteBanner(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isSet = await QB.setActive(
      Banner,
      req.params.banner_id,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
