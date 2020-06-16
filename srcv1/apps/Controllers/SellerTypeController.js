import Controller from "./Controllers";
import SellerTypeProvider from "../Providers/SellerTypeProvider";

class SellerTypeController extends Controller {
  getAllSellerType() {
    try {
      const seller = SellerTypeProvider.createNewSellerType();
      return this.response(seller);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }

  getSellerType() {
    try {
      const seller = SellerTypeProvider.createNewSellerType();
      return this.response(seller);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }
  updateSellerType() {
    try {
      const seller = SellerTypeProvider.createNewSellerType();
      return this.response(seller);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }
  deleteSellerType() {
    try {
      const seller = SellerTypeProvider.createNewSellerType();
      return this.response(seller);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }
  newSellerType() {
    try {
      const seller = SellerTypeProvider.createNewSellerType();
      return this.response(seller);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }
}

export default (...args) => new SellerTypeController(...args);
