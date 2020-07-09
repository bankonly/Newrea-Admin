const Res = require("./response_controller");
const FileProvider = require("../providers/file_provider");
const DeliProvider = require("../providers/delivery_type_provider");
const Helpers = require("../helpers/Global");
const constant = require("../configs/constant");
const QB = require("../helpers/query_builder");
const DeliveryTypeModel = require("../models/DeliveryTypeModel");

// save
export async function savedelivery_type(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isValid = DeliProvider.validate(req);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    const isName = await DeliveryTypeModel.findOne({ name: req.body.name });
    if (isName) return response.duplicated({ data: req.body.name });

    const save_data = {
      name: req.body.name,
      price: req.body.price,
      time: req.body.time,
    };

    const isSave = await DeliveryTypeModel.create(save_data);
    if (!isSave) return response.badRequest({ msg: "failed to create" });
    return response.success({ data: isSave });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update
export async function updatedelivery_type(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isValid = DeliProvider.validate(req, true);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    const isId = await DeliveryTypeModel.findById(req.params.delvery_type_id);
    if (!isId) return response.notFound({ data: req.params.delvery_type_id });

    const isName = await DeliveryTypeModel.findOne({ name: req.body.name });
    if (isName && isName.name !== isId.name) {
      return response.duplicated({ data: req.body.name });
    }

    isId.name = req.body.name;
    isId.price = req.body.price;
    isId.time = req.body.time;

    if (!(await isId.save())) {
      return response.badRequest({ msg: "failed to update" });
    }
    return response.success({ data: isId });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get all
export async function getAlldelivery_type(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: DeliveryTypeModel,
      adminType: req.is_super_admin,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get
export async function getdelivery_type(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: DeliveryTypeModel,
      adminType: req.is_super_admin,
      id: req.params.delvery_type_id,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete
export async function deletedelivery_type(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isSet = await QB.setActive(
      DeliveryTypeModel,
      req.params.delvery_type_id,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
