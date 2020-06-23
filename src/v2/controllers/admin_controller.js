// Files Import Models,Controller ...
const Res = require("./response_controller");
const AdminProvider = require("../providers/admin_provider");
const AccessPolicyProvider = require("../providers/access_policy_provider");
const Admin = require("../models/admin");
const AccessPolicy = require("../models/access_policy");
const Helpers = require("../helpers/Global");
const QueryBuilder = require("../helpers/query_builder");

// Admin Registeration
export async function register(req, res) {
  const response = new Res(res);
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
    // Validate Request Data
    const isValidData = AdminProvider.validateRegisterObj(saveData);

    // Check validator
    if (!Helpers.isEmptyObj(isValidData))
      return response.badRequest({ data: isValidData });

    // register admin
    const registerAdmin = await AdminProvider.createNewAdmin(createData);
    return response.success(registerAdmin);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// Login Admin
export async function login(req, res) {
  const response = new Res(res);
  try {
    // prepare save data
    const loginData = {
      author: req.body.author,
      password: req.body.password,
    };

    const isValidData = AdminProvider.validateLoginObj(loginData);

    // Check validator
    if (!Helpers.isEmptyObj(isValidData))
      return response.badRequest({ data: isValidData });

    const isLoggedIn = await AdminProvider.login(loginData);
    return response.success(isLoggedIn);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get admin list
export async function getAdminList(req, res) {
  const response = new Res(res);
  try {
    const adminData = await AdminProvider.getAdmin({
      is_super_admin: req.is_super_admin,
    });
    return response.success(adminData);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// get admin list
export async function getAdminById(req, res) {
  const response = new Res(res);
  try {
    // Check validator
    if (!Helpers.validateObjectId(req.params.admin_id)) {
      return response.badRequest({ data: "invalid id" });
    }

    const adminData = await AdminProvider.getAdmin({
      adminId: req.params.admin_id,
      is_super_admin: req.is_super_admin,
    });

    return response.success(adminData);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// delete admin
export async function deleteAdmin(req, res) {
  const response = new Res(res);
  try {
    // Check validator
    if (!Helpers.validateObjectId(req.params.admin_id)) {
      return response.badRequest({ data: "invalid id" });
    }

    const isId = await QueryBuilder.isIdExist(Admin, req.params.admin_id);
    if (!isId || isId.is_active == "in_active")
      return response.notFound({ msg: "no data" });

    const delAcc = await QueryBuilder.deleteIsActive(
      Admin,
      req.params.admin_id
    );
    if (!delAcc) {
      return response.badRequest({ msg: "can not delete" });
    }
    return response.success({ msg: "deleted" });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// Update Admin by Id
export async function updateAdmin(req, res) {
  const response = new Res(res);
  try {
    const saveData = {
      name: req.body.name,
      email: req.body.email,
      access_policy_id: req.body.access_policy_id,
      phone_number: req.body.phone_number,
    };

    const updatedata = { ...saveData };
    // Check validator
    if (!Helpers.validateObjectId(req.params.admin_id)) {
      return response.badRequest({ data: "invalid id" });
    }

    // Validate Request Data
    const isValidData = AdminProvider.validateUpdateObj(saveData);

    // Check validator
    if (!Helpers.isEmptyObj(isValidData))
      return response.badRequest({ data: isValidData });

    // register admin
    const registerAdmin = await AdminProvider.updateAdmin(
      updatedata,
      req.params.admin_id
    );
    return response.success(registerAdmin);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// Change Password
export async function changePassword(req, res) {
  const response = new Res(res);
  try {
    const bodyData = {
      password: req.body.password,
      old_password: req.body.old_password,
      confirm_password: req.body.confirm_password,
    };

    if (!Helpers.validateObjectId(req.auth._id)) {
      return response.badRequest({ data: "invalid id" });
    }
    // Validate BodyData
    const isValidData = AdminProvider.validateChangePwd(bodyData);
    if (!Helpers.isEmptyObj(isValidData))
      return response.success({ data: isValidData });

    // call change password function
    const changePwd = await AdminProvider.changePassword(
      bodyData,
      req.auth._id
    );
    return response.success(changePwd);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}

// who am i
export async function whoami(req, res) {
  const response = new Res(res);
  try {
    return response.success({ data: req.auth });
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
