import Validator from "validator";
import Res from "../controllers/DefaultResponseController";
import { AdminQB, Admin } from "../models/Admin";
import Bcrypt from "../helpers/Bcrypt";
import JWT from "../helpers/Jwt";
import CONSTANT from "../configs/constant";
import AccessPolicyProvider from "./AccessPolicyProvider";
import { AccessPolicy } from "../models/Access_policy";
import {
  invalidObjectId,
  isEmptyObj,
  multipleValidateObj
} from "../helpers/Global";

/** Define All Function for Provider  */
class AdminProvider {
  /** Validate Login Object */
  validateLoginObj(object) {
    var error = {};
    if (!object.author) error.author = "field is required";
    if (typeof object.author !== "string")
      error.author = "field should be string";
    if (!object.password) error.password = "field is required";
    return error;
  }

  /** Validate Register Object */
  validateRegisterObj(obj) {
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

    if (!isEmptyObj(error)) return error;
    const validateMul = multipleValidateObj(
      obj,
      ["name", "email", "password", "confirm_password", "phone_number"],
      "number",
      {}
    );
    if (validateMul.length > 0) error = validateMul;
    return error;
  }

  /** Validate Register Object */
  validateUpdateObj(obj) {
    var error = {};
    var msg = "field should be number and field is required";
    if (!obj.name) error.name = "field is required";
    if (typeof obj.name !== "string") error.name = "field should be string";
    if (!obj.email) error.email = "field is required";
    if (!obj.phone_number) error.phone_number = "field is required";
    if (typeof obj.email !== "string" || !Validator.isEmail(obj.email)) {
      error.email = "invalid email";
    }
    if (!isEmptyObj(error)) return error;
    const validateMul = multipleValidateObj(
      obj,
      ["name", "email", "phone_number"],
      "number",
      {}
    );
    if (validateMul.length > 0) error = validateMul;
    return error;
  }

  /** Ceate new Seller */
  async createNewAdmin({
    name,
    password,
    email,
    admin,
    phone_number,
    access_policy,
    most_popular,
    featured_stores,
    recommended_item,
    catagory,
    driver_approved,
    banner,
    popular_screen,
    reason
  }) {
    /** start transaction */
    const transaction = await Admin.startSession();
    transaction.startTransaction();

    try {
      var error = {};
      /** save data for admin */
      const saveData = {
        name,
        password,
        contact: { email: email, phone_number: phone_number },
        login_count: 1,
        access_policy,
        admin,
        phone_number,
        most_popular,
        featured_stores,
        recommended_item,
        catagory,
        driver_approved,
        banner,
        popular_screen,
        reason
      };

      /** check name */
      const isName = await AdminQB.findByName({ name: name });
      const isEmail = await AdminQB.findByEmail({ email: email });
      if (isName !== null) error.name = "already exist";
      if (isEmail !== null) error.email = "already exist";

      /** Validate Error */
      if (!isEmptyObj(error)) return Res.badRequest({ data: error });

      /** delete confirm_password before save */
      delete saveData.confirm_password;

      saveData.password = await Bcrypt.hashPassword(saveData.password);
      const createAdmin = await Admin.create(saveData);

      if (createAdmin) {
        /** prepare save Data for access */
        saveData.admin_id = createAdmin._id;
        await AccessPolicy.create(saveData);

        const tokenData = {
          userId: createAdmin._id,
          login_count: createAdmin.login_count
        };
        const token = JWT.jwtMethod(tokenData, CONSTANT.token_life_time);

        /** End transaction */
        await transaction.commitTransaction();
        transaction.endSession();

        return Res.success({
          data: {
            token: token
          }
        });
      }

      await transaction.commitTransaction();
      transaction.endSession();
      return Res.somethingWrong({ msg: "can not create admin" });
    } catch (error) {
      /** Rolback transaction */
      await transaction.abortTransaction();
      transaction.endSession();
      return Res.somethingWrong({ error: error });
    }
  }

  /** Login */
  async login({ author, password }) {
    try {
      /** check name */
      const isName = await AdminQB.findByName({ name: author });
      const isEmail = await AdminQB.findByEmail({ email: author });

      /** check if two of them return null */
      if (isName == null && isEmail == null) {
        return Res.badRequest({ msg: "invalid author" });
      }

      /** store author Data */
      var authorData = null;
      if (isName !== null) authorData = isName;
      else authorData = isEmail;

      /** password check */
      const isPassword = await Bcrypt.verifyPassword(
        password,
        authorData.password
      );
      if (!isPassword) return Res.badRequest({ msg: "Invalid password" });

      /** Store Login Count Check Old Token */
      authorData.login_count = authorData.login_count + 1;
      authorData.save();

      /** Store token data */
      const tokenData = {
        userId: authorData._id,
        login_count: authorData.login_count
      };
      /** Generate new token */
      const token = JWT.jwtMethod(tokenData, CONSTANT.token_life_time);
      return Res.success({
        data: {
          token: token
        }
      });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }

  /** get Admin */
  async getAdmin({ adminId = null }) {
    try {
      var adminData = null;
      const condition = {
        _id: adminId,
        is_online: "online"
      };

      const selected = "-password";
      if (adminId == null) {
        adminData = await Admin.find().select(selected);
      } else {
        adminData = await Admin.find(condition).select(selected);
      }
      return Res.success({ data: adminData });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }

  /** Update admin Data */
  async updateAdmin(
    {
      name,
      email,
      admin,
      phone_number,
      access_policy,
      most_popular,
      featured_stores,
      recommended_item,
      catagory,
      driver_approved,
      banner,
      popular_screen,
      reason
    },
    admin_id
  ) {
    /** start transaction */
    const transaction = await Admin.startSession();
    transaction.startTransaction();

    try {
      var error = {};
      /** save data for admin */
      const saveData = {
        name,
        contact: { email: email, phone_number: phone_number },
        access_policy,
        phone_number
      };

      const accessPolicySave = {
        admin,
        most_popular,
        featured_stores,
        recommended_item,
        catagory,
        driver_approved,
        banner,
        popular_screen,
        reason
      };

      /** check name */
      const isAdminData = await AdminQB.findByUserId({ id: admin_id });
      if (isAdminData == null)
        return Res.notFound({ msg: "admin_id does not exist" });

      if (isAdminData.contact.email == email) error.email = "already exist";
      if (isAdminData.name == name) error.name = "already exist";
      /** Validate Error */
      if (!isEmptyObj(error)) return Res.badRequest({ data: error });

      const updateAdmin = await Admin.updateOne(
        { _id: admin_id },
        { $set: saveData }
      );

      if (updateAdmin) {
        /** prepare save Data for access */
        await AccessPolicy.updateOne(
          { admin_id: admin_id },
          { $set: accessPolicySave }
        );

        /** End transaction */
        await transaction.commitTransaction();
        transaction.endSession();

        return Res.success({ msg: "updated" });
      }

      await transaction.abortTransaction();
      transaction.endSession();
      return Res.somethingWrong({ msg: "can not create admin" });
    } catch (error) {
      /** Rolback transaction */
      await transaction.abortTransaction();
      transaction.endSession();
      return Res.somethingWrong({ error: error });
    }
  }

  /** Validate chnage password */
  validateChangePwd(obj) {
    var error = {};
    const validateMul = multipleValidateObj(obj, [], "string", {});
    if (validateMul.length > 0) error = validateMul;
    else if (obj.password !== obj.confirm_password)
      error.password = "password not macth";

    return error;
  }

  /** Change password */
  async changePassword({ password, confirm_password, old_password }, admin_id) {
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
}

/** export new SellerProvider */
export default new AdminProvider();
