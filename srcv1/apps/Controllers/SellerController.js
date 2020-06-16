import Controller from "./Controllers";
import SellerProvider from "../Providers/SellerProvider";

class SellerController extends Controller {
  getSeller() {
    try {
      const seller = SellerProvider.createNewSeller();
      return this.response(seller);
    } catch (error) {
      return this.responseError({ error: error });
    }
  }
}

export default (...args) => new SellerController(...args);
