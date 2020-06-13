import { isEmpty } from "validator";
// const isEmpty = require("./is-empty");

export default function validationProductInput(data) {
    let errors = {};

    // console.log(data)
    // data.pd_name = !isEmpty(data.pd_name)
    //     ? data.pd_name
    //     : "";

    if (isEmpty(data.pd_name)) {
        errors.pd_name = "Product Name field is required";
    }
    if (isEmpty(data.pd_brand)) {
        errors.pd_bran = "Bran field is required";
    }
    if (isEmpty(data.pd_desc)) {
        errors.pd_desc = "desc field is required";
    }
    if (isEmpty(data.seller_id)) {
        errors.seller_id = "seller_id field is required";
    }
    return {
        errors,
        // isValid: isEmpty(errors)
    };
};
