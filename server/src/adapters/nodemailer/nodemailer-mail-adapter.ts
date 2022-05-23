import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8083cfd7c54f31",
    pass: "7656d85b3b16f0",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe HMW - Solution - Feedget",
      to: "Hydeo Watase <hydeowatase@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
