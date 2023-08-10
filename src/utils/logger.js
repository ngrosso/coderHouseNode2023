import winston from 'winston';

//FIXME: Cambiar test a prod cuando se haga el cambio
const configLevel = process.env.NODE_ENV === 'test' ? 'info' : 'debug';

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  http: 4,
  debug: 5
};

const logColors = {
  fatal: 'red',
  error: 'orange',
  warn: 'yellow',
  info: 'cyan',
  http: 'darkblue',
  debug: 'green'
}
//winston.addColors(logColors);

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} -- [${level}]\t| ${message}`;
});

export const logger = winston.createLogger({
  levels: logLevels,
  transports: [
    new winston.transports.Console({ level: configLevel, format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), myFormat) }), //FIXME; No quiere tomar los colores custom, ayuda!!
    new winston.transports.File({ filename: './errors.log', level: 'error', format: winston.format.combine(winston.format.timestamp(), myFormat) })
  ]
})

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(`${req.method} en ${req.url}`)
  next();
}