import * as nodemailer from 'nodemailer';
import type { MailInterface } from '../interfaces/mail.d';

export default class MailService {
  // eslint-disable-next-line no-use-before-define
  private static instance: MailService;

  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS,
      },
    });
  }

  // INSTANCE CREATE FOR MAIL
  static getInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  // SEND MAIL
  sendMail(options: MailInterface) {
    return this.transporter.sendMail({
      from: `rplan <${process.env.SMTP_AUTH_USER || options.from}>`,
      to: options.to,
      cc: options.cc,
      bcc: options.bcc,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
  }

  // VERIFY CONNECTION
  async verifyConnection() {
    return this.transporter.verify();
  }

  // CREATE TRANSPORTER
  getTransporter() {
    return this.transporter;
  }
}
