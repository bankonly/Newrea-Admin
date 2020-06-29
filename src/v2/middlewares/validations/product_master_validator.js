
const Joi = require("@hapi/joi");
import Res from "../../controllers/response_controller";

exports.product_master_validate = async (req, res, next) => {
  const response = new Res(res);
  const data = req.body;

  try {
    const schema = Joi.object({
      // name: Joi.string().required(),
      // desc: Joi.string().allow(""),
    });
    await schema.validateAsync(data);
    next();
  } catch (err) {
    return response.badRequest({ data: err });
  }
};
