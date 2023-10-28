import db from '../models/deskDB';
import path from 'path';
import * as fs from 'fs';
import { LogController } from '../types';

export const logController: LogController = {
  getInfo: async (req, res, next) => {
    const combinedPath = path.resolve(__dirname, '..', 'logs', 'combined.log');
    try {
      const logData = fs.readFileSync(combinedPath, 'utf8');

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

      res.locals.logEntries = logEntries;
      return next();
    } catch (error) {
      return next({ error: 'Failed to read log file' });
    }
  },
  getErrors: (req, res, next) => {
    const resolvedPath = path.resolve(__dirname, '..', 'logs', 'error.log');
    try {
      const errorData = fs.readFileSync(resolvedPath, 'utf8');
      const errorEntries = errorData
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

      res.locals.errorEntries = errorEntries;
      return next();
    } catch (error) {
      return next({ error: 'Failed to read error logs file' });
    }
  },
  getResponses: (req, res, next) => {
    const responsePath = path.resolve(__dirname, '..', 'logs', 'resolved.log');
    try {
      const responseData = fs.readFileSync(responsePath, 'utf8');
      const responseEntries = responseData
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
      res.locals.responseEntries = responseEntries;
      return next();
    } catch (error) {
      res.status(500).json({ error: 'Failed to read response-logs file' });
    }
  },
};
