const Res = require("./response_controller");
const FileProvider = require("../providers/file_provider");
const FilterProvider = require("../providers/filter_provider");
const Helpers = require("../helpers/Global");
const constant = require("../configs/constant");
const QB = require("../helpers/query_builder");
const filter = require("../models/filter");

// save
export async function savefilter(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isValid = FilterProvider.validate(req);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    const isName = await filter.findOne({ name: req.body.name });
    if (isName) return response.duplicated({ data: req.body.name });

    const isCreate = await filter.create(req.body);
    if (!isCreate) return response.badRequest({ msg: "can not create" });
    return response.success({ data: isCreate });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// update
export async function updatefilter(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isValid = FilterProvider.validate(req, true);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    const isId = await filter.findById(req.params.filter_id);
    if (!isId) return response.notFound({ data: req.params.filter_id });

    const isName = await filter.findOne({ name: req.body.name });
    if (isName && isId.name !== isName.name) {
      return response.duplicated({ data: req.body.name });
    }

    isId.name = req.body.name;
    isId.price = req.body.price;
    isId.size = req.body.size;
    isId.color = req.body.color;
    isId.brand = req.body.brand;
    isId.gender = req.body.gender;

    if (!(await isId.save())) {
      return response.badRequest({ msg: "can not update" });
    }
    return response.success({ data: isId });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get all
export async function getAllfilter(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: filter,
      adminType: req.is_super_admin,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get
export async function getfilter(req, res) {
  // define response
  const response = new Res(res);
  try {
    const data = await QB.fetch({
      model: filter,
      adminType: req.is_super_admin,
      id: req.params.filter_id,
    });
    return response.success(data);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete
export async function deletefilter(req, res) {
  // define response
  const response = new Res(res);
  try {
    const isSet = await QB.setActive(
      filter,
      req.params.filter_id,
      req.body.is_active
    );
    return response.success(isSet);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
