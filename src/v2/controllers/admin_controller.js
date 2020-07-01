// Files Import Models,Controller ...
const Res = require("./response_controller");
const AdminProvider = require("../providers/admin_provider");
const AccessPolicyProvider = require("../providers/access_policy_provider");
const Admin = require("../models/admin");
const AccessPolicy = require("../models/access_policy");
const Helpers = require("../helpers/Global");
const QueryBuilder = require("../helpers/query_builder");
const File = require("../providers/file_provider");
const constant = require("../configs/constant");

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
      date_of_birth: req.body.date_of_birth,
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
    const isSet = await QueryBuilder.setActive(
      Admin,
      req.params.admin_id,
      req.body.is_active
    );
    return response.success(isSet);
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
      date_of_birth: req.body.date_of_birth,
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

// update profile image
export async function profile(req, res) {
  const response = new Res(res);
  try {
    //  validate body data
    const isValid = AdminProvider.validateProfile(req);
    if (!Helpers.isEmptyObj(isValid)) {
      return response.badRequest({ data: isValid });
    }

    // upload image
    const isUpload = File.uploadImage({
      req,
      file: req.files.img,
      path: constant.imgPath.admin,
    });

    if (!isUpload.status) return response.badRequest(isUpload);

    const isUpdate = await AdminProvider.updateProfile({
      admin_id: req.auth._id,
      img: req.body.img,
    });

    return response.success(isUpdate);
  } catch (error) {
    return response.somethingWrong({ error: error });
  }
}
