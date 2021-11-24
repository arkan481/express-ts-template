import winston from 'winston';
import path from 'path';

const winstonFileFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
	winston.format.json(),
);

/**
 * Winston Logger Module
 */
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		//
		// - Write all logs with level `error` and below to `error.log`
		// - Write all logs with level `info` and below to `combined.log`
		//
		new winston.transports.File({
			// TODO: Change file name for dynamic naming in config.env
			filename: path.join(__dirname, '../../logs/error.log'),
			level: 'error',
			format: winstonFileFormat,
		}),
		new winston.transports.File({
			filename: path.join(__dirname, '../../logs/combined.log'),
			format: winstonFileFormat,
		}),
	],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize({ all: true }),
				winston.format.label({ label: '[Server]' }),
				winston.format.timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
				winston.format.printf(
					(info) =>
						`${info.label} ${info.timestamp}  ${info.level} : ${info.message}`,
				),
			),
		}),
	);
}

export default logger;
