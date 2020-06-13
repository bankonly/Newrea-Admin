import { isEmpty as _isEmpty } from "validator";
import isEmpty from "./is-empty";

export default function validateEditInput(data) {

    data.name = !isEmpty(data.name)
        ? data.name
        : "";
    data.slugName = !isEmpty(data.slugName)
        ? data.slugName
        : "";

    let errors = {};
    if (_isEmpty(data.name)) {
        errors.name = "UserName field is required";
    }

    if (_isEmpty(data.slugName)) {
        errors.slugName = "Seller Phon Number field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};