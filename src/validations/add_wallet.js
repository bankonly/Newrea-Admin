import { isEmpty as _isEmpty } from "validator";
import isEmpty from "./is-empty";

export default function validate_add_wallet(data) {
    let errors = {};

    data.bank_id = !isEmpty(data.bank_id)
        ? data.bank_id
        : "";
    data.sell_id = !isEmpty(data.sell_id)
        ? data.sell_id
        : "";
    data.bank_acc_name = !isEmpty(data.bank_acc_name)
        ? data.bank_acc_name
        : "";
    data.bank_acc_no = !isEmpty(data.bank_acc_no)
        ? data.bank_acc_no
        : "";
    data.bank_type_id = !isEmpty(data.bank_type_id)
        ? data.bank_type_id
        : "";

    if (_isEmpty(data.bank_id)) {
        errors.bank_id = "field is required";
    }
    if (_isEmpty(data.sell_id)) {
        errors.sell_id = "field is required";
    }

    if (_isEmpty(data.bank_acc_no)) {
        errors.bank_acc_no = "field is required";
    }
    if (_isEmpty(data.bank_acc_name)) {
        errors.bank_acc_name = "field is required";
    }
    if (_isEmpty(data.bank_type_id)) {
        errors.bank_type_id = "field is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};