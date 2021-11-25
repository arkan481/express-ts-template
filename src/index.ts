// TODO: CONSTANTS
// TODO: SETUP LOGGER ON UNHANDLED REJECTION
// TODO: SETUP LOGGER ON EVERY REQUEST USING MORGAN WITH EXPRESS APP
import dotenv from 'dotenv';
import express from 'express';
import logger from './config/Logger';

// Using .env
dotenv.config();

// instansiating express app
const app = express();

app.listen(process.env.PORT || 5000, () => {
  logger.info(
    `Server is running in ${process.env.NODE_ENV} mode, on port: ${process.env.PORT}`,
  );
});
