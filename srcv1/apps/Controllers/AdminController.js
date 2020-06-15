import Controller from "./Controllers";
import AdminProvider from "../Providers/AdminProvider";

class SellerController extends Controller {
  getSeller() {
    try {
      const seller = AdminProvider.createNewAdmin();
      return this.response(seller);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }
}

export default (...args) => new SellerController(...args);
