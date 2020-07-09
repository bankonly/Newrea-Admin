import Res from "./response_controller";
import e from "express";
const config = require("./../configs/constant");

const currencyModel = require("../models/CurrencyModel");

// get all currency
exports.getCurrency = async (req, res) => {
  const response = new Res(res);
  try {
    const foundCurrency = await currencyModel.find();
    if (foundCurrency.length > 0) {
      response.success({ data: foundCurrency });
    } else {
      response.success({ data: foundCurrency, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

// create currency
exports.createCurrency = async (req, res) => {
  const response = new Res(res);
  try {
    const newCurrency = new currencyModel(req.body);
    const savedCurrency = await newCurrency.save();
    if (savedCurrency) {
      response.success({ data: savedCurrency });
    } else {
      response.success({ data: savedCurrency, msg: "create currency failed" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

// delete/restore/update
exports.actionCurrency = async (req, res) => {
  const response = new Res(res);
  try {
    const foundCurrency = await currencyModel.findById(req.params.id);
    if (!foundCurrency) {
      return response.success({ data: foundCurrency, msg: "no data found" });
    }
    foundCurrency.set(req.body);
    const updatedCurrency = await foundCurrency.save();
    if (updatedCurrency) {
      return response.success({ data: updatedCurrency });
    } else {
      return response.success({ data: updatedCurrency, msg: "failed" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
