import Res from "../Controllers/DefaultResponseController";
import { UserQB, User } from "../Models/Seller";

/** Define All Function for Provider  */
class SellerProvider {
    
  /** Ceate new Seller */
  async createNewSeller() {
    try {
      return Res.success({ msg: "Seller Created" });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }
}

/** export new SellerProvider */
export default new SellerProvider();
