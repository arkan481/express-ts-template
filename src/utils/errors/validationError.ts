import CustomError from './customError';

class ValidationError extends CustomError {
  name = 'Validation Error';

  constructor(message: string) {
    super(message, 400);
  }
}

export default ValidationError;
