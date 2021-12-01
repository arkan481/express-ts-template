import { ValidationError as ValidationErrorYup } from 'yup';
import { Request, Response, NextFunction } from 'express';
import ValidationError from './validationError';

const validationErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ValidationErrorYup) {
    const message = err.errors[0];
    return next(new ValidationError(message));
  }

  return next(err);
};

export default validationErrorHandler;
