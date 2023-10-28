import { Router } from 'express';
import { ticketController } from '../controllers/ticketController';
const ticketRouter = Router();
ticketRouter.post('/', ticketController.addTicket, (req, res) => {
  return res.status(200).json(res.locals.id);
});
ticketRouter.get('/', ticketController.getTickets, (req, res) => {
  return res.status(200).json(res.locals.tickets);
});

ticketRouter.put('/', ticketController.updateStatus, (req, res) => {
  return res.status(200).json();
});

export { ticketRouter };
