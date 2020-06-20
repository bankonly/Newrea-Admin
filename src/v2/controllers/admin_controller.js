/** Controllers */
import Res from "./response_controller";

/** Providers */
import AdminProvider from "../providers/admin_provider";
import AccessPolicyProvider from "../providers/access_policy_provider";

/** Models */
import { Admin } from "../models/admin";
import { AccessPolicy } from "../models/access_policy";

/** Helpers */
import { isEmptyObj, validateObjectId } from "../helpers/Global";

/** Admin Registeration */
export const register = async (req, res) => {
  const response = Res(res);
  try {
    const saveData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phone_number,
      access_policy_id: req.body.access_policy_id,
      confirm_password: req.body.confirm_password,
    };

    const createData = { ...saveData };
    /** Validate Request Data */
    const isValidData = AdminProvider.validateRegisterObj(saveData);

    /** Check validator */
    if (!isEmptyObj(isValidData))
      return response.badRequest({ data: isValidData });

    /** register admin */
    const registerAdmin = await AdminProvider.createNewAdmin(createData);
    return response.success(registerAdmin);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** Login Admin */
export const login = async (req, res) => {
  const response = Res(res);
  try {
    /** prepare save data */

    const loginData = {
      author: req.body.author,
      password: req.body.password,
    };

    const isValidData = AdminProvider.validateLoginObj(loginData);

    /** Check validator */
    if (!isEmptyObj(isValidData))
      return response.badRequest({ data: isValidData });

    const isLoggedIn = await AdminProvider.login(loginData);
    return response.success(isLoggedIn);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get admin list */
export const getAdminList = async (req, res) => {
  const response = Res(res);
  try {
    const adminData = await AdminProvider.getAdmin({});
    return response.success(adminData);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** get admin list */
export const getAdminById = async (req, res) => {
  const response = Res(res);
  try {
    const isValid = validateObjectId(req.params.admin_id);

    // /** Check validator */
    if (!isEmptyObj(isValid)) return response.badRequest({ data: isValid });

    const adminData = await AdminProvider.getAdmin({
      adminId: req.params.admin_id,
    });

    return response.success(adminData);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** delete admin */
export const deleteAdmin = async (req, res) => {
  const response = Res(res);
  try {
    const isValid = validateObjectId(req.params.admin_id);

    /** Check validator */
    if (!isEmptyObj(isValid)) return response.badRequest({ data: isValid });

    const adminData = await Admin.findByIdAndDelete(req.params.admin_id);
    if (adminData) {
      return response.success({ msg: "Deleted success" });
    }
    return response.success({ msg: "Can not delete" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** Update Admin by Id */
export const updateAdmin = async (req, res) => {
  const response = Res(res);
  try {
    const saveData = {
      name: req.body.name,
      email: req.body.email,
      access_policy_id: req.body.access_policy_id,
      phone_number: req.body.phone_number,
    };

    const updatedata = { ...saveData };
    const isValid = validateObjectId(req.params.admin_id);

    /** Check validator */
    if (!isEmptyObj(isValid)) return response.badRequest({ data: isValid });

    /** Validate Request Data */
    const isValidData = AdminProvider.validateUpdateObj(saveData);

    /** Check validator */
    if (!isEmptyObj(isValidData))
      return response.badRequest({ data: isValidData });

    /** register admin */
    const registerAdmin = await AdminProvider.updateAdmin(
      updatedata,
      req.params.admin_id
    );
    return response.success(registerAdmin);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** Change Password */
export const changePassword = async (req, res) => {
  const response = Res(res);
  try {
    const bodyData = {
      password: req.body.password,
      old_password: req.body.old_password,
      confirm_password: req.body.confirm_password,
    };

    /** Check valid objectId */
    const isValid = validateObjectId(req.auth._id);

    /** Validate BodyData */
    const isValidData = AdminProvider.validateChangePwd(bodyData);
    // return response.success({data:isEmptyObj(isValid)})
    if (!isEmptyObj(isValidData))
      return response.success({ data: isValidData });

    /** call change password function */
    const changePwd = await AdminProvider.changePassword(
      bodyData,
      req.auth._id
    );
    return response.success(changePwd);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};

/** who am i */
export const whoami = async (req, res) => {
  const response = Res(res);
  try {
    return response.success({data:req.auth})
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
};
