import express, { Request, Response, NextFunction } from 'express';
import { ServerError } from './types';
import helmet from 'helmet';
import path from 'path';
import { logger } from './utils/logger';
import { ticketRouter } from './routes/ticketRouter';
import { logRouter } from './routes/logRouter';
const { NODE_ENV } = process.env;
const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/tickets', ticketRouter);
app.use('/logs', logRouter);

app.get('*', (req, res) => {
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
