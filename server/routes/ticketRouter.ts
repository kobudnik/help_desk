import { Router } from 'express';
import { ticketController } from '../controllers/ticketController';
const ticketRouter = Router();
ticketRouter.post('/', ticketController.processTicket, (req, res) => {
  return res.status(200).json(res.locals.id);
});
ticketRouter.get('/', ticketController.getTicket, (req, res) => {
  return res.status(200).json(res.locals.id);
});

export { ticketRouter };
