import { Request, Response, NextFunction } from 'express';

export interface ServerError {
  log: string;
  status: number;
  message: string;
}

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
