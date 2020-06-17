import { isEmpty as _isEmpty } from "validator";
import isEmpty from "./is-empty";

export default function validate_shop_feed(data) {
    let errors = {};

    data.seller_id = !isEmpty(data.seller_id)
        ? data.seller_id
        : "";
    data.hashtag = !isEmpty(data.hashtag)
        ? data.hashtag
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