import CustomError from './customError';

class DBConnectionError extends CustomError {
  name = 'DB Connection Error';

  constructor() {
    super('Database connection error!', 500);
  }
}

export default DBConnectionError;
