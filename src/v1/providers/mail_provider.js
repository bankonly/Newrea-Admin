const res = require("../providers/response_provider");
const Mail = require("nodemailer");
const CONSTANT = require("../configs/constant");
const c_otp = require("../configs/files/otp");

export const send = async ({
  to,
  text = "hello from lamo",
  subject = "from Nome",
  from = null,
  otp_code,
  link,
}) => {
  try {
    const transporter = Mail.createTransport({
      service: CONSTANT.MAIL_SERVICE,
      auth: {
        user: CONSTANT.MAIL_ID,
        pass: CONSTANT.MAIL_PASSWORD,
      },
    });

    const mailSendOption = {
      from: from == null ? CONSTANT.MAIL_ID : from,
      to: to,
      subject: subject,
      text: text,
      html: c_otp.html(otp_code, link),
    };

    const sendMail = await transporter.sendMail(mailSendOption);
    if (sendMail.error) return res.badRequest({ msg: "Mail failed" });
    return res.success({ msg: "Mail sent" });
  } catch (error) {
    return res.somethingWrong({ error: error });
  }
};

export const generateLink = ({ host, otp_code }) => {
  return host + otp_code;
};
