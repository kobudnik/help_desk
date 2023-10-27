import express, { Request, Response, NextFunction } from 'express';
import { ServerError } from './types';
import helmet from 'helmet';
const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Test works yessir' });
});
app.all('*', (req, res) => {
  return res.status(404).json({ message: 'Route not found' });
});

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: 'Global error handler invoked',
  };
  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).json({ message: errorObj.message });
});
export default app;
