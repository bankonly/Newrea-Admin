import { isLength, isEmpty as _isEmpty, equals } from "validator";
import isEmpty from "./is-empty";

export default function validateRegisterInput(data) {
  let errors = {};

  data.user_name = !isEmpty(data.user_name) ? data.user_name : "";
  data.pass = !isEmpty(data.pass) ? data.pass : "";
  data.pass2 = !isEmpty(data.pass2) ? data.pass2 : "";

  if (!isLength(data.user_name, { min: 3, max: 50 })) {
    errors.user_name = "user_name must be between 2 and 30 characters";
  }

  if (_isEmpty(data.user_name)) {
    errors.user_name = "user_name field is required";
  }

  if (_isEmpty(data.name)) {
    errors.name = "user_name field is required";
  }
  if (_isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

  if (_isEmpty(data.phone)) {
    errors.phone = "Phone Number field is required";
  }
  if (!isLength(data.phone, { min: 8, max: 8 })) {
    errors.phone = "Phone Number must be at least 8 characters";
  }

  // if (Validator.isEmpty(data.com)) {
  //   errors.com = "Commision is invalid";
  // }

  if (_isEmpty(data.pass)) {
    errors.pass = "Password field is required";
  }

  if (!isLength(data.pass, { min: 6, max: 30 })) {
    errors.pass = "Password must be at least 6 characters";
  }

  if (_isEmpty(data.pass2)) {
    errors.pass2 = "Confirm Password field is required";
  }

  if (!equals(data.pass, data.pass2)) {
    errors.pass2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
