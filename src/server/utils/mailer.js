import crypto from 'crypto';
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import config, { paths } from '../../../tools/config';

const auth = {
  auth: {
    api_key: process.env.MG_API,
    domain: 'boldr.io'
  }
};
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

const randomString = () => Math.random().toString().substr(2, 8);

export function generateVerifyCode() {
  const content = Array.from(new Array(5), randomString).join();
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

export function sendEmail(to, subject, html) {
  return nodemailerMailgun.sendMail({
    from: config.mg.from,
    to,
    subject,
    html
  });
}

export function sendVerifyEmail(email, verifyCode) {
  const subject = '[Boldr] Confirmation mail';
  const to = email;
  const html = `
    <p>
      Click link: https://boldr.io/account/register/email-check?code=${verifyCode}
    </p>
  `;

  return sendEmail(to, subject, html);
}
