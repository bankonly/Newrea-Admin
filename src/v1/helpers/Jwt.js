const jwt = require("jsonwebtoken");
const CONSTANT = require("../configs/constant");

// JWT only token
export function jwtMethod(
  userObject,
  expireIn,
  secretKey = process.env.SECRET_KEY
) {
  return jwt.sign(userObject, secretKey, {
    expiresIn: expireIn,
  });
}

// JWT with passport
export function jwtMethodWithPassport(userObject, expireIn) {
  return jwt.sign(userObject, CONSTANT.PRIVATE_KEY, {
    expiresIn: expireIn,
    algorithm: CONSTANT.JWT_ALGORITHMS,
  });
}
