import kernel from "../configs/kernel";
import AdminCtl from "../apps/Controllers/AdminController";

export default (app, router) => {
  /** Route For AdminController */
  router.post("/register", (...args) => AdminCtl(...args).register());
  router.post("/login", (...args) => AdminCtl(...args).login());

  /** export route */
  app.use(kernel.routes.app, router);
};
