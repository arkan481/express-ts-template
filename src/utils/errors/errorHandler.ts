import { Request, Response, NextFunction } from 'express';
import CustomError from './customError';
import logger from '../../config/logger';

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
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // TODO: Check for mongo error

  // Log error to file
  logger.error(err);

  return res.status(500).json({
    success: false,
    error: err.message || 'Server Error',
  });
};

export default errorHandler;
