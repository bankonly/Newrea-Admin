import Validator from "validator";
import Res from "../controllers/DefaultResponseController";

/** Define All Function for Provider  */
class AccessPolicyProvider {
  /** Validate Register obj */
  validateAccessObj(obj) {
    var error = {};
    var msg = "field should be number and field is required";
    if (typeof obj.admin !== "number" || !obj.admin) error.admin = msg;
    if (typeof obj.most_popular !== "number" || !obj.most_popular) error.most_popular = msg;
    if (typeof obj.featured_stores !== "number" || !obj.featured_stores) error.featured_stores = msg;
    if (typeof obj.recommended_item !== "number" || !obj.recommended_item) error.recommended_item = msg;
    if (typeof obj.catagory !== "number" || !obj.catagory) error.catagory = msg;
    if (typeof obj.driver_approved !== "number" || !obj.driver_approved) error.driver_approved = msg;
    if (typeof obj.banner !== "number" || !obj.banner) error.banner = msg;
    if (typeof obj.popular_screen !== "number" || !obj.popular_screen) error.popular_screen = msg;
    if (typeof obj.reason !== "number" || !obj.reason) error.reason = msg;
    return error;
  }
}

/** export new SellerProvider */
export default new AccessPolicyProvider();
