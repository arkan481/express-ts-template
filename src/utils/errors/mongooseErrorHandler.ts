import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import CustomError from './customError';

const { ValidationError, CastError } = Error;

const mongooseErrorHandler = (
  err: globalThis.Error,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (err instanceof ValidationError) {
    const messages = Object.values(err.errors).map((error) => error.message);
    return next(new CustomError(messages.toString(), 400));
  }

  if (err instanceof CastError) {
    const message = `Resource with the id of: ${err.value} is not found!`;
    return next(new CustomError(message, 404));
  }

  // if its not mongoose error, then delegate to god-tier error handler.
  return next(err);
};

export default mongooseErrorHandler;
