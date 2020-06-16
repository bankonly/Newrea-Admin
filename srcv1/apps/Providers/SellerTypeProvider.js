import Res from "../Controllers/DefaultResponseController";
import { UserQB, User } from "../Models/Seller";

/** Define All Function for Provider  */
class SellerTypeProvider {
    
  /** Ceate new Seller */
  async createNewSellerType() {
    try {
      return Res.success({ msg: "Seller Created" });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }
}

/** export new SellerTypeProvider */
export default new SellerTypeProvider();
