import CustomError from './customError';

class DBConnectionError extends CustomError {
  constructor() {
    super('Database connection error!', 500);
  }
}

export default DBConnectionError;
