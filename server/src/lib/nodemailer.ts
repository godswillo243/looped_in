import nodemailer, { SendMailOptions } from "nodemailer";
import { SMTP_PASS, SMTP_USER } from "../config/env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

export const sendMail = async ({
  to,
  subject,
  html,
  text,
  ...others
}: SendMailOptions) => {
  try {
    const mailOptions = {
      from: '"LoopedIn" <no-reply@looped_in.com>',
      to,
      subject,
      html,
      text,
      ...others,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (e) {
    console.log(e);
  }
};
