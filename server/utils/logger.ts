import { createLogger, transports, format } from 'winston';
import path from 'path';

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../logs', 'error.log'),
      level: 'error',
    }),
    new transports.File({
      filename: path.join(__dirname, '../logs', 'info.log'),
      level: 'info',
    }),
  ],
});

export { logger };
