import env from 'config/env.config';
import Winston, { format } from 'winston';

const logger: Winston.Logger = Winston.createLogger({
  level: 'info',
  exitOnError: false,
  format: format.combine(
    format.colorize({
      colors: { info: 'blue', warning: 'yellow', error: 'red' },
    }),
    format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS' }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new Winston.transports.Console({
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
});

if (env.NODE_ENV === 'production') {
  logger.add(
    new Winston.transports.File({ filename: 'app.log', level: 'error' })
  );
  logger.exceptions.handle(
    new Winston.transports.File({ filename: 'exception.log' })
  );
  logger.rejections.handle(
    new Winston.transports.File({ filename: 'rejection.log' })
  );
}

export default logger;
