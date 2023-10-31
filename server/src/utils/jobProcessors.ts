import Queue from 'bull';
import mailer from 'config/mailer.config';
import {
  sendOtpTemplate,
  sendWelcomeTemplate,
  sendPasswordResetTemplate,
  sendPasswordUpdateTemplate,
} from 'utils/emailTemplate';
import env from 'config/env.config';
// eslint-disable-next-line import/extensions
import logger from './logger';

const { EMAIL_ADDRESS, APP_NAME } = env;

const processOTPJob = async (job: Queue.Job) => {
  try {
    logger.info(`Sending otp email to '${job.data.email}'`);
    const message = {
      from: EMAIL_ADDRESS,
      to: job.data.email,
      subject: `${APP_NAME} Email Verification`,
      html: sendOtpTemplate(job.data),
    };

    return await mailer.sendMail(message);
  } catch (error) {
    logger.error(`Failed to send confirmation mail to '${job.data.email}`);
  }
  return null;
};

const processWelcomeJob = async (job: Queue.Job) => {
  try {
    logger.info(`Sending welcome email to '${job.data.email}'`);

    const message = {
      from: EMAIL_ADDRESS,
      to: job.data.email,
      subject: `Welcome to ${APP_NAME}`,
      html: sendWelcomeTemplate(job.data),
    };
    return await mailer.sendMail(message);
  } catch (error) {
    logger.error(`Failed to send welcome mail to '${job.data.email}'`);
  }
  return null;
};

const processPasswordResetJob = async (job: Queue.Job) => {
  try {
    logger.info(`Sending password reset mail to '${job.data.email}'`);

    const message = {
      from: EMAIL_ADDRESS,
      to: job.data.email,
      subject: `${APP_NAME} - Reset your password`,
      html: sendPasswordResetTemplate(job.data),
    };
    return await mailer.sendMail(message);
  } catch (error) {
    logger.error(`Failed to send password reset mail to '${job.data.email}'`);
  }
  return null;
};

const processPasswordUpdateJob = async (job: Queue.Job) => {
  try {
    logger.info(`Sending password update mail to '${job.data.email}'`);

    const message = {
      from: EMAIL_ADDRESS,
      to: job.data.email,
      subject: `Your password has been updated`,
      html: sendPasswordUpdateTemplate(job.data),
    };
    return await mailer.sendMail(message);
  } catch (error) {
    logger.error(`Failed to send password update mail to '${job.data.email}'`);
  }
  return null;
};

export {
  processOTPJob,
  processWelcomeJob,
  processPasswordResetJob,
  processPasswordUpdateJob,
};
