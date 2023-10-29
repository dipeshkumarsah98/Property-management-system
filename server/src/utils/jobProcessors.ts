import Queue from 'bull';
import mailer from 'config/mailer.config';
import { sendOtpTemplate, sendWelcomeTemplate } from 'utils/emailTemplate';
// eslint-disable-next-line import/extensions
import logger from './logger';

const processOTPJob = async (job: Queue.Job) => {
  try {
    logger.info(`Sending otp email to '${job.data.email}'`);
    const message = {
      from: process.env.EMAIL_ADDRESS,
      to: job.data.email,
      subject: `${process.env.APP_NAME} Email Verification`,
      html: sendOtpTemplate(job.data),
    };

    return await mailer.sendMail(message);
  } catch (error) {
    logger.error(`Failed to send confirmation email to '${job.data.email}`);
  }
  return null;
};

const processWelcomeJob = async (job: Queue.Job) => {
  try {
    logger.info(`Sending welcome email to '${job.data.email}'`);

    const message = {
      from: process.env.EMAIL_ADDRESS,
      to: job.data.email,
      subject: `${process.env.APP_NAME} Email Verification`,
      html: sendWelcomeTemplate(job.data),
    };
    return await mailer.sendMail(message);
  } catch (error) {
    logger.error(`Failed to send welcome email to '${job.data.email}'`);
  }
  return null;
};

export { processOTPJob, processWelcomeJob };
