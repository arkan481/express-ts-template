// TODO: CONSTANTS
// TODO: SETUP LOGGER ON UNHANDLED REJECTION
// TODO: SETUP LOGGER ON EVERY REQUEST USING MORGAN WITH EXPRESS APP
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import logger from './config/logger';

// Using .env
dotenv.config();

// instansiating express app
const app = express();

// Using logger to log requests
const loggerMode = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(
  morgan(loggerMode, {
    stream: {
      write: (info: String) => {
        logger.info(info);
      },
    },
  }),
);

// start express to listen to a port
app.listen(process.env.PORT || 5000, () => {
  logger.info(
    `Server is running in ${process.env.NODE_ENV} mode, on port: ${process.env.PORT}`,
  );
});
