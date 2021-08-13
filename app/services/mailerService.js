import nodemailer from "nodemailer";
import config from "../config/index.js";

let transporter = null;

export default {
  async sendVerificationEmail(to) {
    const sentEmailInfo = await transporter.sendMail({
      from: config.email, // sender address
      to,
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.info(`Get ✉️ at: ${nodemailer.getTestMessageUrl(sentEmailInfo)}`);
  },
};
(async () => {
  const { user, pass, smtp } = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    ...smtp,
    auth: {
      user,
      pass,
    },
  });
})();
