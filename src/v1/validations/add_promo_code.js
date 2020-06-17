import { isEmpty as _isEmpty } from "validator";
import isEmpty from "./is-empty";

export default function validate_add_promo_code(data) {
    let errors = {};

    data.seller_id = !isEmpty(data.seller_id)
        ? data.seller_id
        : "";
    data.name = !isEmpty(data.name)
        ? data.name
        : "";
    data.code = !isEmpty(data.code)
        ? data.code
        : "";
    data.type = !isEmpty(data.type)
        ? data.type
        : "";
    data.start_date = !isEmpty(data.start_date)
        ? data.start_date
        : "";
    data.end_date = !isEmpty(data.end_date)
        ? data.end_date
        : "";
    data.limited = !isEmpty(data.limited)
        ? data.limited
        : "";

    if (_isEmpty(data.seller_id)) {
        errors.seller_id = "field is required";
    }
    if (_isEmpty(data.name)) {
        errors.name = "field is required";
    }
    if (_isEmpty(data.code)) {
        errors.code = "field is required";
    }

    if (_isEmpty(data.end_date)) {
        errors.end_date = "field is required";
    }
    if (_isEmpty(data.start_date)) {
        errors.start_date = "field is required";
    }
    if (_isEmpty(data.type)) {
        errors.type = "field is required";
    }
    if (_isEmpty(data.limited)) {
        errors.limited = "field is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};