import { Router } from 'express';
import { logController } from '../controllers/logController';
const logRouter = Router();

logRouter.get('/', logController.getInfo, (req, res) => {
  return res.status(200).json(res.locals.logEntries);
});
logRouter.get('/errors', logController.getErrors, (req, res) => {
  return res.status(200).json(res.locals.errorEntries);
});

export { logRouter };
