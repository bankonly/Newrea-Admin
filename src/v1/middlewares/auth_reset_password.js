const response = require("ssv-response");
import jwt from "jsonwebtoken";
import CONSTANT from "../configs/constant";
const Model = require("newrea_model");
const UserModel = Model.User.Model;

export default async (req, res, next) => {

  if (!req.headers.authorization) {
    return response.unAuthorized({});
  }

  let authorization = req.headers.authorization.split(" ");
  if (authorization.length > 1) {
    authorization = authorization[1];
  } else {
    authorization = authorization[0];
  }

  try {
    const decoded = jwt.verify(
      authorization,
      process.env.SECRET_KEY_RESET_PASSWORD
    );
    const userData = await UserModel.findOne({ _id: decoded._id }).select(
      "-password -__v"
    );
    if (userData == null) {
      return response.notFound({ msg: "user might be deleted or banned" });
    }

    req.auth = userData;
    global.auth = userData;
    return next();
  } catch (error) {
    console.log(error.message);
    const errorResponse = error.message;
    if (errorResponse == "jwt expired") {
      // console.log("EXPIRED");
    }
    return response.unAuthorized({});
  }
};
