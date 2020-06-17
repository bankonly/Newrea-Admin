import ResCtl from "./response_controller";

/** save catagory */
export const save_category = (req, res, next) => {
  /** define response */
  const response = ResCtl(res);
  try {
    return response.success({});
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};
