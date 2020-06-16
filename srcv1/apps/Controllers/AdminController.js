import Controller from "./Controllers";
import AdminProvider from "../Providers/AdminProvider";
import AccessPolicyProvider from "../Providers/AccessPolicyProvider";
import { isEmptyObj, validateObjectId } from "../Helpers/Global";
import { Admin, AdminQB } from "../Models/Admin";
import { AccessPolicy } from "../Models/Access_policy";

class AdminController extends Controller {
  /** Admin Registeration */
  async register() {
    try {
      const saveData = {
        name: this.body.name,
        email: this.body.email,
        password: this.body.password,
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
}

export default (...args) => new AdminController(...args);
