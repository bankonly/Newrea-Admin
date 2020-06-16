import { Admin, AdminQB } from "../Models/Admin";
import Res from "../Controllers/ResponseController";
import Jwt from "jsonwebtoken";
import CONSTANT from "../../configs/constant";

export default async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return Res(res).unAuthorized({});
    }

    const decoded = Jwt.verify(authorization, process.env.SECRET_KEY);
    const userData = await Admin.findOne({
      _id: decoded.userId,
      is_active: { $in: [1] }
    }).select("-password -__v");

    if (userData == null) {
      return Res(res).notFound({ msg: "user might be deleted or banned" });
    }

    if (userData.loginCount !== decoded.loginCount) {
      return Res(res).unAuthorized({});
    }
    req.auth = userData;
    return next();
  } catch (error) {
    console.log(error.message);
    return Res(res).unAuthorized({});
  }
};
