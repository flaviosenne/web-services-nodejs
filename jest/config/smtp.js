const { createTransport } = require("nodemailer");
const { log } = require("../utils/logger");

const configMailtrap = {
  host: "smtp.mailtrap.io",
  port: 2525,
  security: false,
  auth: {
    user: "f77f7f6acca5e6",
    pass: "c2df74c03512f3",
  },
};

const FROM = process.env.EMAIL_FROM;
const TO = process.env.EMAIL_TO;

const transporter = createTransport(configMailtrap);

const Smtp = {
  send(subject, body) {
    transporter
      .sendMail({ from: FROM, to: TO, subject, html: body })
      .then((msg) => log.info(`Envio de email para ${TO} - ${msg.messageId}`))
      .catch((error) => log.error(error));
  }
}


module.exports = { Smtp }