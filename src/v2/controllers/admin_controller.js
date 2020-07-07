// Files Import Models,Controller ...
// const Res = require("./response_controller");
const AdminProvider = require("../providers/admin_provider");
const AccessPolicyProvider = require("../providers/access_policy_provider");
const Admin = require("../models/admin");
const AccessPolicy = require("../models/access_policy");
const Helpers = require("../helpers/Global");
const QueryBuilder = require("../helpers/query_builder");
const File = require("../providers/file_provider");
const constant = require("../configs/constant");
const Bcrypt = require("../helpers/Bcrypt");

// Admin Registeration
export async function register(req, res) {
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
      return Res.badRequest({ data: isValidData });

    // register admin
    const registerAdmin = await AdminProvider.createNewAdmin(createData);
    return Res.success(registerAdmin);
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// Login Admin
export async function login(req, res) {
  try {
    // prepare save data
    const loginData = {
      author: req.body.author,
      password: req.body.password,
    };

    const isValidData = AdminProvider.validateLoginObj(loginData);

    // Check validator
    if (!Helpers.isEmptyObj(isValidData))
      return Res.badRequest({ data: isValidData });

    const isLoggedIn = await AdminProvider.login(loginData);
    return Res.success(isLoggedIn);
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// get admin list
export async function getAdminList(req, res) {
  try {
    const adminData = await AdminProvider.getAdmin({
      is_super_admin: req.is_super_admin,
    });
    return Res.success(adminData);
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// get admin list
export async function getAdminById(req, res) {
  try {
    // Check validator
    if (!Helpers.validateObjectId(req.params.admin_id)) {
      return Res.badRequest({ data: "invalid id" });
    }

    const adminData = await AdminProvider.getAdmin({
      adminId: req.params.admin_id,
      is_super_admin: req.is_super_admin,
    });

    return Res.success(adminData);
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// delete admin
export async function deleteAdmin(req, res) {
  try {
    const isSet = await QueryBuilder.setActive(
      Admin,
      req.params.admin_id,
      req.body.is_active
    );
    return Res.success(isSet);
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// Update Admin by Id
export async function updateAdmin(req, res) {
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
      return Res.badRequest({ data: "invalid id" });
    }

    // Validate Request Data
    const isValidData = AdminProvider.validateUpdateObj(saveData);

    // Check validator
    if (!Helpers.isEmptyObj(isValidData))
      return Res.badRequest({ data: isValidData });

    // register admin
    const registerAdmin = await AdminProvider.updateAdmin(
      updatedata,
      req.params.admin_id
    );
    return Res.success(registerAdmin);
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// Change Password
export async function changePassword(req, res) {
  try {
    const bodyData = {
      password: req.body.password,
      old_password: req.body.old_password,
      confirm_password: req.body.confirm_password,
    };

    // Validate BodyData
    const isValidData = AdminProvider.validateChangePwd(bodyData);
    if (!Helpers.isEmptyObj(isValidData))
      return Res.success({ data: isValidData });

    // call change password function
    const changePwd = await AdminProvider.changePassword(
      bodyData,
      req.auth._id
    );
    return Res.success(changePwd);
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// who am i
export async function whoami(req, res) {
  try {
    return Res.success({ data: req.auth });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// update profile image
export async function profile(req, res) {
  try {
    //  validate body data
    const isValid = AdminProvider.validateProfile(req);
    if (!Helpers.isEmptyObj(isValid)) {
      return Res.badRequest({ data: isValid });
    }

    // upload image
    const isUpload = File.uploadImage({
      req,
      file: req.files.img,
      path: constant.imgPath.admin,
    });

    if (!isUpload.status) return Res.badRequest(isUpload);

    const isUpdate = await AdminProvider.updateProfile({
      admin_id: req.auth._id,
      img: req.body.img,
    });

    return Res.success(isUpdate);
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// reset Password
exports.resetPassword = async (req, res) => {
  const response = new Res(res);
  const adminID = req.params.id;
  try {
    let foundAdmin = await Admin.findById(adminID);
    if (!foundAdmin) {
      return response.notFound({ data: adminID, msg: "admin not found" });
    }

    // encryp password
    const encriptedPass = await Bcrypt.hashPassword(req.body.password);
    foundAdmin.password = encriptedPass;
    if (await foundAdmin.save()) {
      return response.success({
        data: foundAdmin,
        msg: "reset password admin successfully",
      });
    } else {
      return response.somethingWrong({});
    }
  } catch (ex) {
    return response.somethingWrong({ error: ex });
  }
};
