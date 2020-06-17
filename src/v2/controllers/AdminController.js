import Controller from "./controllers";
import AdminProvider from "../providers/AdminProvider";
import AccessPolicyProvider from "../providers/AccessPolicyProvider";
import { isEmptyObj, validateObjectId } from "../helpers/Global";
import { Admin, AdminQB } from "../models/Admin";
import { AccessPolicy } from "../models/Access_policy";

class AdminController extends Controller {
  /** Admin Registeration */
  async register() {
    try {
      const saveData = {
        name: this.body.name,
        email: this.body.email,
        password: this.body.password,
        phone_number: this.body.phone_number,
        access_policy: this.body.access_policy,
        confirm_password: this.body.confirm_password,
        admin: this.body.admin,
        most_popular: this.body.most_popular,
        featured_stores: this.body.featured_stores,
        recommended_item: this.body.recommended_item,
        catagory: this.body.catagory,
        driver_approved: this.body.driver_approved,
        banner: this.body.banner,
        popular_screen: this.body.popular_screen,
        reason: this.body.reason
      };

      const createData = { ...saveData };
      /** Validate Request Data */
      const isValidData = AdminProvider.validateRegisterObj(saveData);

      /** Check validator */
      if (!isEmptyObj(isValidData))
        return this.badRequest({ data: isValidData });

      /** register admin */
      const registerAdmin = await AdminProvider.createNewAdmin(createData);
      return this.response(registerAdmin);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }

  /** Login Admin */
  async login() {
    try {
      /** prepare save data */
      const loginData = {
        author: this.body.author,
        password: this.body.password
      };

      const isValidData = AdminProvider.validateLoginObj(loginData);

      /** Check validator */
      if (!isEmptyObj(isValidData))
        return this.badRequest({ data: isValidData });

      const isLoggedIn = await AdminProvider.login(loginData);
      return this.response(isLoggedIn);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }

  /** get admin list */
  async getAdminList() {
    try {
      const adminData = await AdminProvider.getAdmin({});
      return this.response(adminData);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }

  /** get admin list */
  async getAdminById() {
    try {
      const isValid = validateObjectId(this.params.admin_id);

      // /** Check validator */
      if (!isEmptyObj(isValid)) return this.badRequest({ data: isValid });

      const adminData = await AdminProvider.getAdmin({
        adminId: this.params.admin_id
      });

      return this.response(adminData);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }

  /** delete admin */
  async deleteAdmin() {
    try {
      const isValid = validateObjectId(this.params.admin_id);

      /** Check validator */
      if (!isEmptyObj(isValid)) return this.badRequest({ data: isValid });

      const adminData = await Admin.findByIdAndDelete(this.params.admin_id);
      if (adminData) {
        return this.response({ msg: "Deleted success" });
      }
      return this.response({ msg: "Can not delete" });
    } catch (error) {
      return this.responseError({ error: error });
    }
  }

  /** Update Admin by Id */
  async updateAdmin() {
    try {
      const saveData = {
        name: this.body.name,
        email: this.body.email,
        access_policy: this.body.access_policy,
        admin: this.body.admin,
        most_popular: this.body.most_popular,
        phone_number: this.body.phone_number,
        featured_stores: this.body.featured_stores,
        recommended_item: this.body.recommended_item,
        catagory: this.body.catagory,
        driver_approved: this.body.driver_approved,
        banner: this.body.banner,
        popular_screen: this.body.popular_screen,
        reason: this.body.reason
      };

      const updatedata = { ...saveData };
      const isValid = validateObjectId(this.params.admin_id);

      /** Check validator */
      if (!isEmptyObj(isValid)) return this.badRequest({ data: isValid });

      /** Validate Request Data */
      const isValidData = AdminProvider.validateUpdateObj(saveData);

      /** Check validator */
      if (!isEmptyObj(isValidData))
        return this.badRequest({ data: isValidData });

      /** register admin */
      const registerAdmin = await AdminProvider.updateAdmin(
        updatedata,
        this.params.admin_id
      );
      return this.response(registerAdmin);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }

  /** Change Password */
  async changePassword() {
    try {
      const bodyData = {
        password: this.body.password,
        old_password: this.body.old_password,
        confirm_password: this.body.confirm_password
      };

      /** Check valid objectId */
      const isValid = validateObjectId(this.req.auth._id);

      /** Validate BodyData */
      const isValidData = AdminProvider.validateChangePwd(bodyData);
      // return this.response({data:isEmptyObj(isValid)})
      if (!isEmptyObj(isValidData)) return this.response({ data: isValidData });

      /** call change password function */
      const changePwd = await AdminProvider.changePassword(
        bodyData,
        this.req.auth._id
      );
      return this.response(changePwd);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }
}

export default (...args) => new AdminController(...args);
