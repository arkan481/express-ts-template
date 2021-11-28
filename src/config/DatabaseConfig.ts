import { connect } from 'mongoose';
import logger from './logger';
import { DBConnectionError } from '../utils/errors';

const mongoConnect = async () => {
  const { MONGO_URI } = process.env;

  if (MONGO_URI === undefined) {
    throw new DBConnectionError();
  }

  const conn = await connect(process.env.MONGO_URI!!);
  logger.info(`MongoDB connected at: ${conn.connection.host}`);
};

export default mongoConnect;
