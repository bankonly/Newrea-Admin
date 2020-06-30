import constant from "../configs/constant";

const Validator = require("validator");
const Res = require("../controllers/default_res_controller");
const Admin = require("../models/admin");
const Bcrypt = require("../helpers/Bcrypt");
const JWT = require("../helpers/Jwt");
const CONSTANT = require("../configs/constant");
const AccessPolicyProvider = require("./access_policy_provider");
const AccessPolicy = require("../models/access_policy");
const Helpers = require("../helpers/Global");
const File = require("./file_provider");

// Define All Function for Provider
export function validateLoginObj(object) {
  var error = {};
  if (!object.author) error.author = "field is required";
  if (typeof object.author !== "string")
    error.author = "field should be string";
  if (!object.password) error.password = "field is required";
  return error;
}

// Validate Register Object
export function validateRegisterObj(obj) {
  var error = {};
  var msg = "field should be number and field is required";
  if (!obj.name) error.name = "field is required";
  if (typeof obj.name !== "string") error.name = "field should be string";
  if (!obj.email) error.email = "field is required";
  if (!obj.phone_number) error.phone_number = "field is required";
  if (!obj.password) error.password = "field is required";
  if (!obj.confirm_password) error.confirm_password = "field is required";
  if (obj.password !== obj.confirm_password)
    error.password = "password not match";
  if (typeof obj.email !== "string" || !Validator.isEmail(obj.email)) {
    error.email = "invalid email";
  }
  if (!Helpers.isDate(obj.date_of_birth)) {
    error.date_of_birth = "field is required as date";
  }
  if (!Helpers.validateObjectId(obj.access_policy_id)) {
    error.access_policy_id = "field is requried as string and objectId";
  }
  return error;
}

// Validate Register Object
export function validateUpdateObj(obj) {
  var error = {};
  var msg = "field should be number and field is required";
  if (!obj.name) error.name = "field is required";
  if (typeof obj.name !== "string") error.name = "field should be string";
  if (!obj.email) error.email = "field is required";
  if (!obj.phone_number) error.phone_number = "field is required";
  if (typeof obj.email !== "string" || !Validator.isEmail(obj.email)) {
    error.email = "invalid email";
  }
  if (!Helpers.isDate(obj.date_of_birth)) {
    error.date_of_birth = "field is required as date";
  }
  if (!Helpers.validateObjectId(obj.access_policy_id)) {
    error.access_policy_id = "field is requried as string and objectId";
  }
  return error;
}

// Ceate new Seller
export async function createNewAdmin({
  name,
  password,
  email,
  admin,
  phone_number,
  access_policy_id,
  date_of_birth,
}) {
  try {
    var error = {};
    // save data for admin
    const saveData = {
      name,
      password,
      contact: { email: email, phone_number: phone_number },
      login_count: 1,
      access_policy: access_policy_id,
      date_of_birth: date_of_birth,
    };

    // find access policy id
    const isAccesspolicy = await AccessPolicy.findById(access_policy_id);
    if (isAccesspolicy == null) {
      return Res.notFound({ msg: "access_policy_id not found" });
    }

    // check name
    const isName = await Admin.findOne({ name: name });
    const isEmail = await Admin.findOne({ "contact.email": email });
    if (isName !== null) error.name = "already exist";
    if (isEmail !== null) error.email = "already exist";

    // Validate Error
    if (!Helpers.isEmptyObj(error)) return Res.badRequest({ data: error });

    // delete confirm_password before save
    delete saveData.confirm_password;

    saveData.password = await Bcrypt.hashPassword(saveData.password);
    const createAdmin = await Admin.create(saveData);

    if (createAdmin) {
      const tokenData = {
        userId: createAdmin._id,
        login_count: createAdmin.login_count,
      };
      const token = JWT.jwtMethod(tokenData, CONSTANT.token_life_time);

      return Res.success({
        data: {
          token: token,
        },
      });
    }

    return Res.somethingWrong({ msg: "can not create admin" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// Login
export async function login({ author, password }) {
  try {
    // check name
    const isName = await Admin.findOne({ name: author });
    const isEmail = await Admin.findOne({ "contact.email": author });

    // check if two of them return null
    if (isName == null && isEmail == null) {
      return Res.badRequest({ msg: "invalid author" });
    }

    // store author Data
    var authorData = null;
    if (isName !== null) authorData = isName;
    else authorData = isEmail;

    // password check
    const isPassword = await Bcrypt.verifyPassword(
      password,
      authorData.password
    );
    if (!isPassword) return Res.badRequest({ msg: "Invalid password" });

    // Store Login Count Check Old Token
    authorData.login_count = authorData.login_count + 1;
    authorData.save();

    // Store token data
    const tokenData = {
      userId: authorData._id,
      login_count: authorData.login_count,
    };
    // Generate new token
    const token = JWT.jwtMethod(tokenData, CONSTANT.token_life_time);
    return Res.success({
      data: {
        token: token,
      },
    });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// get Admin
export async function getAdmin({ adminId = null, is_super_admin }) {
  try {
    var adminData = null;
    const condition = {
      _id: adminId,
      is_online: "online",
    };

    if (!is_super_admin) {
      condition.is_active = "inactive";
    }

    const join = {
      path: "access_policy",
      select: "-createdAt -updatedAt -__v",
    };
    const selected = "-password -__v";
    if (adminId == null) {
      adminData = await Admin.find().populate(join).select(selected);
    } else {
      adminData = await Admin.findOne(condition)
        .populate(join)
        .select(selected);
    }

    if (adminData == null || adminData.length < 1) {
      return Res.notFound({ msg: "no data" });
    }
    return Res.success({ data: adminData });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// Update admin Data
export async function updateAdmin(
  { name, email, admin, phone_number, access_policy_id, date_of_birth },
  admin_id
) {
  try {
    var error = {};
    // save data for admin
    const saveData = {
      name,
      contact: { email: email, phone_number: phone_number },
      access_policy: access_policy_id,
      phone_number,
      date_of_birth,
    };

    // find access policy id
    const isAccesspolicy = await AccessPolicy.findById(access_policy_id);
    if (isAccesspolicy == null) {
      return Res.notFound({ msg: "access_policy_id not found" });
    }

    // check admin_id
    const isAdminData = await Admin.findById(admin_id);
    if (isAdminData == null)
      return Res.notFound({ msg: "admin_id does not exist" });

    // check name,email
    const isName = await Admin.findOne({ name: name });
    const isEmail = await Admin.findOne({ "contact.email": email });
    const isPhoneNumber = await Admin.findOne({
      "contact.phone_number": phone_number,
    });

    // check if two of them return null
    if (isName !== null && isName.name !== isAdminData.name) {
      error.name = "already exist";
    }
    if (
      isEmail !== null &&
      isEmail.contact.email !== isAdminData.contact.email
    ) {
      error.email = "already exist";
    }

    // Validate Error
    if (!Helpers.isEmptyObj(error)) return Res.badRequest({ data: error });

    const updateAdmin = await Admin.updateOne(
      { _id: admin_id },
      { $set: saveData }
    );

    if (updateAdmin) {
      return Res.success({ msg: "updated" });
    }

    return Res.somethingWrong({ msg: "can not update admin" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// Validate chnage password
export function validateChangePwd(obj) {
  var error = {};
  const validateMul = Helpers.multipleValidateObj(obj, [], "string", {});
  if (validateMul.length > 0) error = validateMul;
  else if (obj.password !== obj.confirm_password)
    error.password = "password not macth";

  return error;
}

// Change password
export async function changePassword(
  { password, confirm_password, old_password },
  admin_id
) {
  try {
    const adminData = await Admin.findById(admin_id);
    if (adminData == null)
      return Res.notFound({ msg: "admin_id does not exist" });

    if (!(await Bcrypt.verifyPassword(old_password, adminData.password))) {
      return Res.badRequest({ data: "password not match with old password" });
    }

    adminData.password = await Bcrypt.hashPassword(password);
    adminData.save();

    return Res.success({ msg: "Password changed" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}

// validate image prifile update
export function validateProfile(req) {
  var error = {};
  if (!Helpers.isFile(req.files, "img")) {
    error.img = "please upload image";
  }
  return error;
}

// update admin profile
export async function updateProfile({ admin_id, img }) {
  try {
    const isId = await Admin.findById(admin_id);

    // store image to remove
    const remove = isId.profile_img;

    // set new image
    isId.profile_img = img;

    if (isId.save()) {
      File.removeFileMany({
        path: constant.imgPath.admin,
        fileName: remove,
        subFolder: [800, 200],
      });
      return Res.success({ data: img });
    }
    return Res.badRequest({ msg: "cannot update profile" });
  } catch (error) {
    return Res.somethingWrong({ error: error });
  }
}
