import { Request, Response, NextFunction } from 'express';

export type ServerError = {
  log: string;
  status: number;
  message: string;
};

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export type TicketController = {
  addTicket: MiddlewareFunction;
  getTickets: MiddlewareFunction;
  updateStatus: MiddlewareFunction;
};

export type LogController = {
  getInfo: MiddlewareFunction;
  getResponses: MiddlewareFunction;
  getErrors: MiddlewareFunction;
};
