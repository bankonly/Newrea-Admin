import Controller from "./controllers";
import SellerTypeProvider from "../providers/SellerTypeProvider";

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
