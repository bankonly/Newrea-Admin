import Res from "./ResponseController"

class Controller {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.params = req.params;
    this.body = req.body;
    this.send = Res(res);
    this.response = Res(res).success;
    this.badRequest = Res(res).badRequest
    this.notFound = Res(res).notAllowed
    this.responseError = Res(res).somethingWrong;
  }
}

export default Controller;
