import Res from "../Controllers/DefaultResponseController";
import { AdminQB, Admin } from "../Models/Seller";

/** Define All Function for Provider  */
class AdminProvider {
    
  /** Ceate new Seller */
  async createNewAdmin() {
    try {
      return Res.success({ msg: "Seller Created" });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }
}

/** export new SellerProvider */
export default new AdminProvider();
