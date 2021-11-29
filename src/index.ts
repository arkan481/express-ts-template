// TODO: ASYNC HANDLER ERROR
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { OpticMiddleware } from '@useoptic/express-middleware';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import logger from './config/logger';
import limiter from './config/limiter';
import mongooseErrorHandler from './utils/errors/mongooseErrorHandler';
import errorHandler from './utils/errors/errorHandler';
import db from './config/databaseConfig';

// Using .env
dotenv.config();

// instansiating express app
const app = express();

// Using cors to ALLOW ALL request coming from anywhere
// * Make sure this comes before using every routes
app.use(cors());

// Using helmet as recommended by express docs to increase security.
app.use(helmet());

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

// Using body parser to parse request body, only to JSON format for every routes
app.use(bodyParser.json());

// Using xss clean to sanitize data in req.body, req.query, and req.params from xss attack
// * Make sure this comes BEFORE using every routes
// * Make sure this comes AFTER using body parser
app.use(xss());

// Using hpp to stop polluting HTTP parameter
// * Make sure this comes BEFORE using every routes
// * Make sure this comes AFTER using body parser
app.use(hpp());

// Using optic middleware to document the API
// * Make sure this comes AFTER using body parser
app.use(
  OpticMiddleware({
    // not enabled in production
    enabled: process.env.NODE_ENV !== 'production',
  }),
);

// Using rate limiter to limit requests
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
app.use(limiter);

// Instansiating db as a function call
// * Make sure this comes BEFORE every routes
db();

// Using mogngoose error handler middleware
// * Make sure this comes BEFORE the god-tier error handler
// * Make sure this comes AFTER the db instansiation
app.use(mongooseErrorHandler);

// Using custom error handler middleware
// * Make sure this comes AFTER every other middlewares!
app.use(errorHandler);

// start express to listen to a port
const server = app.listen(process.env.PORT || 5000, () => {
  logger.info(
    `Server is running in ${process.env.NODE_ENV} mode, on port: ${process.env.PORT}`,
  );
});

// ! Handling BIG FATAL errors
process
  .on('unhandledRejection', (err: Error) => {
    logger.error(`FATAL|Unhandled Rejection: ${err}`);
    server.close(() => {
      process.exit(48);
    });
  })
  .on('uncaughtException', (err: Error) => {
    logger.error(`FATAL|Uncaught Exception: ${err}`);
    server.close(() => {
      process.exit(48);
    });
  });
