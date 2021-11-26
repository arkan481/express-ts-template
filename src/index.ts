// TODO: IMPLEMENT SWAGGER DOCS
// TODO: HANDLE MONGOOSE ERROR LOGGING, CUSTOM ERROR CLASS, ASYNC HANDLER ERROR
// TODO: INSTALL ALL SECURITY NPM PACKAGES, MONGO-SANIIZE, ETC.
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { OpticMiddleware } from '@useoptic/express-middleware';
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

// Using optic middleware to document the API
app.use(
  OpticMiddleware({
    // not enabled in production
    enabled: process.env.NODE_ENV !== 'production',
  }),
);

// Logging runtime errors with custom logger, then delegating to express default error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  // delegating the error to express default error handler
  next(err);
});

// start express to listen to a port
const server = app.listen(process.env.PORT || 5000, () => {
  logger.info(
    `Server is running in ${process.env.NODE_ENV} mode, on port: ${process.env.PORT}`,
  );
});

// ! Handling BIG FATAL errors
process
  .on('unhandledRejection', (err) => {
    logger.error(`FATAL|Unhandled Rejection: ${err}`);
    server.close(() => {
      process.exit(48);
    });
  })
  .on('uncaughtException', (err) => {
    logger.error(`FATAL|Uncaught Exception: ${err}`);
    server.close(() => {
      process.exit(48);
    });
  });
