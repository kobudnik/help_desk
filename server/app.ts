import express, { Request, Response, NextFunction } from 'express';
import { ServerError } from './types';
import helmet from 'helmet';
import path from 'path';
import { logger } from './utils/logger';
import { ticketRouter } from './routes/ticketRouter';
import fs from 'fs';
const { NODE_ENV } = process.env;
const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/tickets', ticketRouter);
app.get('/logs', (req, res) => {
  try {
    const logData = fs.readFileSync(
      path.join(__dirname, 'logs', 'combined.log'),
      'utf8',
    );
    const logEntries = logData
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch (error) {
          return {
            level: 'error',
            message: 'Failed to parse log entry',
            raw: line,
          };
        }
      });

    console.log({ logEntries });
    res.status(200).json(logEntries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read log file' });
  }
});

app.get('*', (req, res) => {
  logger.info('A request to the root route just happened.');
  const pathToIndex =
    NODE_ENV === 'production'
      ? path.resolve(__dirname, '../client/index.html')
      : path.resolve(__dirname, '../client/src/index.html');

  res.sendFile(pathToIndex);
});

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  logger.error('An error occurred:', err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: 'Global error handler invoked',
  };
  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).json({ message: errorObj.message });
});
export default app;
