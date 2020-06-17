import { isLength, isEmpty as _isEmpty, equals } from "validator";
import isEmpty from "./is-empty";

export default function validateChangePasswordInput(data) {
    let errors = {};

    data.sell_id = !isEmpty(data.sell_id)
        ? data.sell_id
        : "";
    data.sell_old_pass = !isEmpty(data.sell_old_pass)
        ? data.sell_old_pass
        : "";
    data.sell_old_pass = !isEmpty(data.sell_old_pass)
        ? data.sell_old_pass
        : "";
    data.sell_new_pass = !isEmpty(data.sell_new_pass)
        ? data.sell_new_pass
        : "";
    data.sell_new_pass_confirm = !isEmpty(data.sell_new_pass_confirm)
        ? data.sell_new_pass_confirm
        : "";

    if (_isEmpty(data.sell_id)) {
        errors.sell_id = "UserName field is required";
    }

    // Old Password
    if (_isEmpty(data.sell_old_pass)) {
        errors.sell_old_pass = "Password field is required";
    }
    if (!isLength(data.sell_old_pass, { min: 6, max: 15 })) {
        errors.sell_old_pass = "Password must be at least 6 characters";
    }

    // Now Password
    if (!isLength(data.sell_new_pass, { min: 6, max: 15 })) {
        errors.sell_new_pass = "Password must be at least 6 characters";
    }

    if (_isEmpty(data.sell_new_pass)) {
        errors.sell_new_pass = "New Password field is required";
    }

    if (_isEmpty(data.sell_new_pass_confirm)) {
        errors.sell_new_pass_confirm = "Confirm Password field is required";
    }

    if (!equals(data.sell_new_pass, data.sell_new_pass_confirm)) {
        errors.sell_new_pass_confirm = "Passwords must match";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};