import { Admin } from "../models/admin";
import Res from "../controllers/response_controller";
import Jwt from "jsonwebtoken";
import CONSTANT from "../configs/constant";

export default async (req, res, next) => {
  const response = new Res(res);
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return response.unAuthorized({});
    }

    const decoded = Jwt.verify(authorization, process.env.SECRET_KEY);
    const userData = await Admin.findOne({
      _id: decoded.userId,
      is_online: "online",
    })
      .populate({
        path: "access_policy",
        select: "is_super_admin",
      })
      .select("-password -__v");

    if (userData == null) {
      return response.notFound({ msg: "user might be deleted or banned" });
    }

    if (userData.login_count !== decoded.login_count) {
      return response.unAuthorized({});
    }
    req.auth = userData;
    req.is_super_admin = userData.access_policy.is_super_admin;
    return next();
  } catch (error) {
    console.log(error.message);
    return response.unAuthorized({});
  }
};
