import Queue from 'bull';
import { processOTPJob, processWelcomeJob } from 'utils/jobProcessors';
import logger from 'utils/logger';
// eslint-disable-next-line import/extensions
import { SENT_OTP, WELCOME_MSG } from 'constants/mail.constants';
import env from './env.config';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = env;

const emailQueue = new Queue('email', {
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
