import { TicketController } from '../types';
import db from '../models/deskDB';
const errorTemplate = {
  log: 'Error in ticket middleware',
  status: 400,
  message: 'Error in ticket middleware',
};

export const ticketController: TicketController = {
  processTicket: async (req, res, next) => {
    try {
      const { name, email, title, description } = req.body;

      const text = `INSERT INTO tickets (name, email, title, description)
                   VALUES ($1, $2, $3, $4)
                   RETURNING id;`;

      const values = [name, email, title, description];
      const result = await db.query(text, values);
      console.log({ result });

      const insertedTicketId = result.rows[0].id;
      res.locals.id = insertedTicketId;
      return next();
    } catch (e) {
      return next({
        ...errorTemplate,
        status: 400,
        message: 'Ticket failed to add',
      });
    }
  },
  getTicket: async (req, res, next) => {
    try {
      const text = 'SELECT * FROM tickets';
      const result = await db.query(text);
      res.locals.id = result.rows;
      return next();
    } catch (e) {
      return next({
        ...errorTemplate,
        status: 500,
        message: 'Failed to retrieve tickets',
      });
    }
  },
};
