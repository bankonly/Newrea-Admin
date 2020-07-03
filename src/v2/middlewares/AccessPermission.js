const Res = require("../controllers/response_controller");

const permission = (req, accessPolicy, param, routeName) => {
  const route = req.path.split("/")[1];
  console.log(route)
  console.log(accessPolicy[param])
  // check admin route permission
  if (route == routeName && accessPolicy[param] == 1) return true;
  return false;
};

export function AccessPermission(req, res, next) {
  const resp = new Res(res);
  try {
    const accessPolicy = req.auth.access_policy;
    if(req.is_super_admin) return next();
    else if (permission(req, accessPolicy, "admin", "admin")) return next();
    else if (permission(req, accessPolicy, "most_popular", "mostPopular")) return next();
    else if (permission(req, accessPolicy, "featured_stores", "featured_store")) return next();
    else if (permission(req, accessPolicy, "recommended_item", "recommendItem")) return next();
    else if (permission(req, accessPolicy, "category", "category")) return next();
    else if (permission(req, accessPolicy, "driver_approved", "driver")) return next();
    else if (permission(req, accessPolicy, "banner", "banner")) return next();
    else if (permission(req, accessPolicy, "popular_search", "popularSearch")) return next();
    else if (permission(req, accessPolicy, "reason", "reason")) return next();
    else if (permission(req, accessPolicy, "order", "order")) return next();
    else if (permission(req, accessPolicy, "seller", "seller")) return next();
    else if (permission(req, accessPolicy, "brand", "brand")) return next();
    else if (permission(req, accessPolicy, "categories", "categories")) return next();
    else if (permission(req, accessPolicy, "currency", "currency")) return next();
    else if (permission(req, accessPolicy, "delivery_type", "delivery_type")) return next();
    else if (permission(req, accessPolicy, "delivery_fee", "deliveryFee")) return next();
    else if (permission(req, accessPolicy, "payment_method", "paymentMethod")) return next();
    else {
      return resp.unAuthorized({ msg: "access denied" });
    }
  } catch (error) {
    return resp.somethingWrong({ error: error });
  }
}
