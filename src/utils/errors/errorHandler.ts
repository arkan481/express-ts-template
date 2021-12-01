import { Request, Response, NextFunction } from 'express';
import CustomError from './customError';
import { logger } from '../../config';
import { ErrorResponse } from '../responses';

/**
 * God tier error handler
 */
const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // disable eslint unused var rule because this error handler needs 4 parameter to run.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    // Log error to file
    logger.error(err.message);
    return res.status(err.statusCode).json(new ErrorResponse(err.message));
  }

  // Log error to file
  logger.error(err.message);

  return res.status(500).json(new ErrorResponse(err.message || 'Server Error'));
};

export default errorHandler;
