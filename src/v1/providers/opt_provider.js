export const generateOtp = ({
  limit = 6,
  multiple = 10,
  digit = "0123456789",
}) => {
  let opt = "";
  for (let i = 0; i < limit; i++) {
    opt += digit[Math.floor(Math.random() * multiple)];
  }
  return opt;
};
