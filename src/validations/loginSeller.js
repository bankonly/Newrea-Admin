import { isEmpty as _isEmpty } from "validator";
import isEmpty from "./is-empty";

export default function validateRegisterInput(data) {
    let errors = {};

    data.user_name = !isEmpty(data.user_name)
        ? data.user_name
        : "";
    data.pass = !isEmpty(data.pass)
        ? data.pass
        : "";

    if (_isEmpty(data.user_name)) {
        errors.user_name = "user name field is required";
    }

    if (_isEmpty(data.pass)) {
        errors.pass = "Password field is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};
