import Queue from 'bull';
import {
  processOTPJob,
  processWelcomeJob,
  processPasswordResetJob,
  processPasswordUpdateJob,
} from 'utils/jobProcessors';
import logger from 'utils/logger';
import {
  SENT_OTP,
  WELCOME_MSG,
  PASSSWORD_RESET,
  PASSSWORD_UPDATE,
  MAIL_QUEUE,
} from 'constants/mail.constants';
import env from './env.config';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = env;

const emailQueue = new Queue(MAIL_QUEUE, {
  redis: { port: +REDIS_PORT, host: REDIS_HOST, password: REDIS_PASSWORD },
});

emailQueue.on('active', (job) => {
  logger.info(`Processing job ${job.id} of type ${job.name}`);
});

emailQueue.on('completed', (job) => {
  logger.info(`Completed job ${job.id} of type ${job.name}`);
});

emailQueue.on('failed', (job, error) => {
  logger.error(
    `Failed job ${job.id} of type ${job.name}: ${error.message}`,
    error.stack
  );
});

emailQueue.process(SENT_OTP, processOTPJob);
emailQueue.process(WELCOME_MSG, processWelcomeJob);
emailQueue.process(PASSSWORD_RESET, processPasswordResetJob);
emailQueue.process(PASSSWORD_UPDATE, processPasswordUpdateJob);

export default function createJob(name: string, data: any) {
  const options = {
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: true,
  };
  emailQueue.add(name, data, options);
}
