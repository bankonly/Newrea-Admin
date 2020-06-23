import Res from "../../controllers/response_controller";
exports.checkImgUpload = async (req, res, next) => {
  const response = new Res(res);
  if (!req.files) {
    return response.badRequest({
      msg: "please select image",
    });
  }
  const acceptType = ["image/jpeg", "image/jpg"];
  const imgNameReq = Object.keys(req.files);
  for (let i = 0; i < imgNameReq.length; i++) {
    if (!acceptType.includes(req.files[imgNameReq[i]].mimetype)) {
      return response.badRequest({
        msg: `image extension must be ${acceptType}`,
      });
    }
  }
  next();
};
