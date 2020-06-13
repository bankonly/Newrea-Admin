import { isEmpty as _isEmpty } from "validator";
import isEmpty from "./is-empty";

export default function validate_product_seller_Input(data) {
    let errors = {};

    data.product_master_id = !isEmpty(data.product_master_id)
        ? data.product_master_id
        : "";
    data.seller_id = !isEmpty(data.seller_id)
        ? data.seller_id
        : "";
    data.product_option_id = !isEmpty(data.product_option_id)
        ? data.product_option_id
        : "";

    if (_isEmpty(data.product_master_id)) {
        errors.product_master_id = "field is required";
    }

    if (_isEmpty(data.seller_id)) {
        errors.seller_id = "field is required";
    }
    if (_isEmpty(data.product_option_id)) {
        errors.product_option_id = "field is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};
