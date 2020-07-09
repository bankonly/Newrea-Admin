import Res from "./response_controller";

const paymentMethodModel = require("../models/PaymentMethodModel");

// get all payment methods
exports.getPaymentMethods = async (req, res) => {
  const response = new Res(res);
  try {
    const foundPaymentMethods = await paymentMethodModel.find();
    if (foundPaymentMethods.length > 0) {
      response.success({ data: foundPaymentMethods });
    } else {
      response.success({ data: foundPaymentMethods, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

exports.createPaymentMethod = async (req, res) => {
  const response = new Res(res);
  try {
    const newData = paymentMethodModel(req.body);
    const foundPaymentMethods = await newData.save();
    if (foundPaymentMethods) {
      response.success({ data: foundPaymentMethods });
    } else {
      throw new Error("create payment method failed");
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
// update/delate/restore
exports.updatePaymentMethod = async (req, res) => {
  const response = new Res(res);
  const id = req.params.id;
  try {
    const foundPaymentMethod = await paymentMethodModel.findById(id);
    if (foundPaymentMethod) {
      foundPaymentMethod.set(req.body);
      if (await foundPaymentMethod.save()) {
        response.success({ data: foundPaymentMethod });
      } else {
        response.success({ data: foundPaymentMethod, msg: "failed" });
      }
    } else {
      response.notFound({
        data: foundPaymentMethod,
        msg: "payment method not found",
      });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
