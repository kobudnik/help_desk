import { TicketController } from '../types';
import db from '../models/deskDB';
import { logger } from '../utils/logger';
const errorTemplate = {
  log: 'Error in ticket middleware',
  status: 400,
  message: 'Error in ticket middleware',
};

export const ticketController: TicketController = {
  addTicket: async (req, res, next) => {
    try {
      const { name, email, subject, description } = req.body;
      if (!name || !email || !subject || !description) {
        throw new Error('Missing required parameters.');
      }

      const text = `INSERT INTO tickets (name, email, subject, description)
                   VALUES ($1, $2, $3, $4)
                   RETURNING id;`;

      const values = [name, email, subject, description];
      const result = await db.query(text, values);

      const insertedTicketId = result.rows[0].id;
      res.locals.id = insertedTicketId;
      logger.info('Submitted new ticket');
      return next();
    } catch (e: unknown) {
      const insertErr = {
        ...errorTemplate,
        status: 400,
        message: 'Ticket failed to add.',
      };
      if (e instanceof Error) insertErr.message += ' ' + e.message;
      return next(insertErr);
    }
  },
  getTickets: async (req, res, next) => {
    try {
      const text = 'SELECT * FROM tickets';
      const result = await db.query(text);

      res.locals.tickets = result.rows;
      return next();
    } catch (e: unknown) {
      const retrieveErr = {
        ...errorTemplate,
        status: 400,
        message: 'Failed to retrieve tickets.',
      };
      if (e instanceof Error) retrieveErr.message += ' ' + e.message;
      return next({
        retrieveErr,
      });
    }
  },
  updateStatus: async (req, res, next) => {
    try {
      const { id, newStatus, response } = req.body;
      if (!id || !newStatus) {
        throw new Error('Missing required parameters.');
      }
      let text = 'UPDATE tickets SET status = $1 WHERE id = $2';
      const params = [newStatus, id];
      if (response?.length > 0) {
        text = 'UPDATE tickets SET status = $1, response=$3 WHERE id = $2';
        params.push(response);
      }
      await db.query(text, params);
      if (newStatus === 'resolved') {
        let logInfo = `Normally send email here. Responded to ticket id#${id}.`;
        if (response) logInfo += '' + response;
        logger.info(logInfo);
      } else if (newStatus === 'in progress')
        logger.info(`id #${id}: Status upgraded to in progress`);

      return next();
    } catch (e: unknown) {
      const updateErr = {
        ...errorTemplate,
        status: 400,
        message: 'Failed to update ticket status.',
      };
      if (e instanceof Error) updateErr.message += ' ' + e.message;
      return next(updateErr);
    }
  },
};
