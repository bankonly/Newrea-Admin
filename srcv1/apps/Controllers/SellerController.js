import Controller from "./Controllers"

class SellerController extends Controller{
    getSeller(){
        return this.response({})
    }
}

export default (...args) => new SellerController(...args)