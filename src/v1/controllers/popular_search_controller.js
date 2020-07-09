import Res from "./response_controller";

const popularSearchModel = require("../models/popular_search");

// get all popular search
exports.getPopularSearch = async (req, res) => {
  const response = new Res(res);
  try {
    const popularSearch = await popularSearchModel.find();
    if (popularSearch.length > 0) {
      response.success({ data: popularSearch });
    } else {
      response.success({ data: popularSearch, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
// create popular search key woord
exports.createPopularSearch = async (req, res) => {
  const response = new Res(res);
  const keyword = req.body;
  try {
    const newKeyWord = new popularSearchModel(keyword);
    const createKeyword = await newKeyWord.save();
    if (createKeyword) {
      response.success({ data: createKeyword });
    } else {
      throw new Error();
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

// update  seller
exports.updatePopularSearch = async (req, res) => {
  const response = new Res(res);
  const paramID = req.params.id;
  const keyWord = req.body;
  try {
    let foundKeyWord = await popularSearchModel.findById(paramID);
    if (!foundKeyWord) {
      return response.notFound({
        data: foundKeyWord,
        msg: "this key word not found",
      });
    }
    foundKeyWord.set(keyWord);
    if (await foundKeyWord.save()) {
      return response.success({
        data: foundKeyWord,
        msg: "update popular search successfully",
      });
    } else {
      return response.somethingWrong({});
    }
  } catch (ex) {
    return response.somethingWrong({ error: ex });
  }
};
