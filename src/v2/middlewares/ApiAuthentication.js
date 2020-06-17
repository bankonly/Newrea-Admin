import { Admin, AdminQB } from "../models/admin";
import Res from "../controllers/response_controller";
import Jwt from "jsonwebtoken";
import CONSTANT from "../configs/constant";

export default async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return Res(res).unAuthorized({});
    }

    const decoded = Jwt.verify(authorization, process.env.SECRET_KEY);
    const userData = await Admin.findOne({
      _id: decoded.userId,
      is_online: "online"
    }).select("-password -__v");
    
    if (userData == null) {
      return Res(res).notFound({ msg: "user might be deleted or banned" });
    }

    if (userData.login_count !== decoded.login_count) {
      return Res(res).unAuthorized({});
    }
    req.auth = userData;
    return next();
  } catch (error) {
    console.log(error.message);
    return Res(res).unAuthorized({});
  }
};
