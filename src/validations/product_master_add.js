import { isEmpty as _isEmpty } from "validator";
import isEmpty from "./is-empty";

export default function validate_add_product_master(data) {

    data.name = !isEmpty(data.name)
        ? data.name
        : "";
    data.brand = !isEmpty(data.brand)
        ? data.brand
        : "";
    data.SKU = !isEmpty(data.SKU)
        ? data.SKU
        : "";
    data.cat_id = !isEmpty(data.cat_id)
        ? data.cat_id
        : "";

    let errors = {};
    if (_isEmpty(data.name)) {
        errors.name = "UserName field is required";
    }

    if (_isEmpty(data.brand)) {
        errors.brand = "Brand field is required";
    }

    if (_isEmpty(data.SKU)) {
        errors.SKU = "SKU field is required";
    }
    if (_isEmpty(data.cat_id)) {
        errors.cat_id = "Category field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};