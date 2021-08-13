import nodemailer from "nodemailer";

(async () => {
  // Generate test SMTP service account from ethereal.email
  const { user, pass, smtp } = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    ...smtp,
    auth: {
      user,
      pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log(nodemailer.getTestMessageUrl(info));
})();
