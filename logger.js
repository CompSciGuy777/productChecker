const { createLogger, transports ,format} = require('winston');

const Logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.File({ filename: 'logs/info.txt' }),
  ],
});

module.exports = {
    Logger
};