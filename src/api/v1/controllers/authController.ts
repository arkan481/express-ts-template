import { NextFunction, Request, Response } from 'express';
import { SuccessResponse } from '../../../utils/responses';
import { User } from '../typings/interfaces';
import { asyncHandler, validationMiddleware as validate } from '../middlewares';
import { createUser, checkForExistingEmail } from '../services/AuthService';
import { userValidationSchema } from '../validations';
import { ValidationError } from '../../../utils/errors';

const createUserController = [
  validate(userValidationSchema),
  // Check for email exists
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as User;
    const emailExists = await checkForExistingEmail(user.email);
    if (emailExists) {
      return next(
        new ValidationError(`Email ${user.email} is already exists!`),
      );
    }

    return next();
  }),
  // Creates new user
  asyncHandler(async (req: Request, res: Response) => {
    const user = req.body as User;
    const newUser = await createUser(user);
    res.status(201).json(new SuccessResponse(newUser));
  }),
];

export {
  // eslint-disable-next-line import/prefer-default-export
  createUserController,
};
