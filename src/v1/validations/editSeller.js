import { isEmpty as _isEmpty } from "validator";
import isEmpty from "./is-empty";

export default function validateEditInput(data) {

    data.name = !isEmpty(data.name)
        ? data.name
        : "";
    data.phone = !isEmpty(data.phone)
        ? data.phone
        : "";
    // data.seller_type_id = !isEmpty(data.seller_type_id)
    //     ? data.seller_type_id
    //     : "";
    data.sell_id = !isEmpty(data.sell_id)
        ? data.sell_id
        : "";

    let errors = {};
    if (_isEmpty(data.name)) {
        errors.name = "UserName field is required";
    }

    if (_isEmpty(data.phone)) {
        errors.phone = "Seller Phon Number field is required";
    }

    // if (_isEmpty(data.seller_type_id)) {
    //     errors.seller_type_id = "Seller Type field is required";
    // }
    if (_isEmpty(data.sell_id)) {
        errors.sell_id = "Seller ID field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};