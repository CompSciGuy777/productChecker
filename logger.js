const fs = require("fs");

const infoStream = fs.appendFile("logs/info.txt");

const Logger = {}
Logger.info = function(msg) {
  const message = new Date().toDateString('YYYY-MM-DD') + " : " + msg + "\n";
  infoStream.once('open', () => {
    infoStream.write(message);
  })
};

module.exports = {
    Logger
};