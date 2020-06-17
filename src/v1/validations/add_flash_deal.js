import { isEmpty as _isEmpty } from "validator";
import isEmpty from "./is-empty";

export default function validate_add_flash_deal(data) {
    let errors = {};

    // data.product_seller_id = !isEmpty(data.product_seller_id)
    //     ? data.product_seller_id
    //     : "";
    data.seller_id = !isEmpty(data.seller_id)
        ? data.seller_id
        : "";
    data.start_date = !isEmpty(data.start_date)
        ? data.start_date
        : "";
    data.end_date = !isEmpty(data.end_date)
        ? data.end_date
        : "";

    // if (_isEmpty(data.product_seller_id)) {
    //     errors.product_seller_id = "field is required";
    // }
    if (_isEmpty(data.seller_id)) {
        errors.seller_id = "field is required";
    }
    if (_isEmpty(data.start_date)) {
        errors.start_date = "field is required";
    }
    if (_isEmpty(data.end_date)) {
        errors.end_date = "field is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};