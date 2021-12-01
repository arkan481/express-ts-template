import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema } from 'yup';

const validate =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const reqBody = req.body;

    try {
      await schema.validate(reqBody);
      return next();
    } catch (error) {
      return next(error);
    }
  };

export default validate;
