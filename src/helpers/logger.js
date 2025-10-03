const pino = require('pino');

const isDev = process.env.NODE_ENV !== 'production';

let logger;

if (isDev) {
  logger = pino(
    pino.transport({
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname',
        singleLine: true
      },
    })
  );
} else {
  logger = pino({
    level: 'info',
    base: null,
    formatters: {
      level: (label) => ({ level: label }),
    },
  });
}

const log = (tags, data) => {
  const logs = { tags };
  if (data) Object.assign(logs, { data });
  logger.info(logs);
};

// Middleware HTTP logger
const httpLogger = (req, res, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const diff = process.hrtime(start);
    const responseTime = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(3);

  logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${responseTime} ms`
);

  });

  next();
};

module.exports = { log, httpLogger };