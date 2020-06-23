import bycrypt from "bcrypt";

export async function hashPassword(password, round = 10) {
  return await bycrypt.hash(password, round);
}

export async function verifyPassword(password, hashedPassword) {
  return await bycrypt.compare(password, hashedPassword);
}
