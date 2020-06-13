import { isEmpty as _isEmpty } from "validator";
import isEmpty from "./is-empty";

export default function validate_add_bank(data) {
    let errors = {};

    data.name_la = !isEmpty(data.name_la)
        ? data.name_la
        : "";
    data.name_en = !isEmpty(data.name_en)
        ? data.name_en
        : "";

    if (_isEmpty(data.name_la)) {
        errors.name_la = "field is required";
    }

    if (_isEmpty(data.name_en)) {
        errors.name_en = "field is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};