import nodemailer from 'nodemailer';
import env from './env.config';

const { EMAIL_SERVICE, EMAIL_ADDRESS, EMAIL_PASSWORD } = env;

const config = {
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
};

const mailer = nodemailer.createTransport(config);

export default mailer;
