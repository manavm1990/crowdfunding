import nodemailer from "nodemailer";
import config from "../config/index.js";

let transporter = null;

export default {
  async sendVerificationEmail(to, url) {
    console.log(url);
    const sentEmailInfo = await transporter.sendMail({
      from: config.email, // sender address
      to,
      subject: "Hello ✔", // Subject line
      text: "Verify ✉️", // plain text body

      // TODO: Use handlebars for better ✉️
      html: `<a href=${url} target="_blank">Verify</a>`, // html body
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
