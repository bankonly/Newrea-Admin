import Res from "./response_controller";

const deliveryFeeOptionModel = require("../models/delivery_fee_option");
// get all delivery fee option
exports.getDeliveryFeeList = async (req, res) => {
  const response = Res(res);
  try {
    const deliveryFeeOption = await deliveryFeeOptionModel.find();
    if (deliveryFeeOption.length > 0) {
      response.success({ data: deliveryFeeOption });
    } else {
      response.success({ data: deliveryFeeOption, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
// create new  delivery fee option
exports.createDeliveryFee = async (req, res) => {
  const response = Res(res);
  const deliveryFeeData = req.body;
  try {
    const delivery = new deliveryFeeOptionModel(deliveryFeeData);
    const savedDelivery = await delivery.save();
    if (savedDelivery) {
      response.created({
        data: savedDelivery,
        msg: "create delivery fee option successfully",
      });
    } else {
      response.success({
        data: sellers,
        msg: "create delivery fee option failed",
      });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

// create new  delivery fee option
exports.disableDeliveryFee = async (req, res) => {
  const response = Res(res);
  const deliveryFeeId = req.params.id;
  try {
    let foundDlv = await deliveryFeeOptionModel.findById(deliveryFeeId);
    if (!foundDlv) {
      return response.notFound({});
    }
    const newValue = foundDlv.is_active === "active" ? "inActive" : "active";
    foundDlv.is_active = newValue;
    if (await foundDlv.save()) {
      response.success({
        data: foundDlv,
      });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
// create new  delivery fee option
exports.updateDeliveryFee = async (req, res) => {
  const response = Res(res);
  const deliveryFeeId = req.params.id;
  const newData = req.body;
  try {
    const foundDlv = await deliveryFeeOptionModel.findById(deliveryFeeId);
    if (!foundDlv) {
      return response.notFound({});
    }
    foundDlv.set(newData);
    if (await foundDlv.save()) {
      response.success({
        data: foundDlv,
        msg: "update delivery fee option successfully",
      });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
