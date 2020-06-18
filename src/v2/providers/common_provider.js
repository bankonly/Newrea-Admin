import Res from "../controllers/default_res_controller";

/** Helpers */
import { validateObjectId } from "../helpers/Global";

export const cm_delete = async (model, id) => {
  try {
    if (!validateObjectId(id)) {
      return Res.badRequest({ msg: "invalid access policy id" });
    }

    const delAcc = await model.findByIdAndDelete(id);
    if (!delAcc) return Res.badRequest({ msg: "can not delete" });
    return Res.success({ msg: "deleted" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
};
