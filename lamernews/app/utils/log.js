(function(){
  var toFile = false;
  var Console = require('console').Console,
  fs = require('fs');
  var fileStream;
  var access;

  function getCurrentTime() {
    var date = new Date();
    return `${date.getDate()}.${date.getMonth()+1} ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;
  }

  function writeToFile() {
    if (!toFile){
      fileStream = fs.createWriteStream(`./logs/log-${getCurrentTime()}.log`);
      access = new Console(fileStream, fileStream);

      toFile = true;
    }
  }

  function info(msg) {
    log(Array.from(arguments), 'info');
  }

  function warning(msg) {
    log(Array.from(arguments), 'warn');
  }

  function error(msg){
    log(Array.from(arguments), 'error');
  }

  function log(msg, type) {
    var date = new Date();
    msg = [getCurrentTime(), '\t'].concat(msg);
    if (toFile) {
      console[type].apply(console, msg);
      access[type].apply(access, msg);
    } else {
      console[type].apply(console, msg);
    }
  }

  module.exports = {
    info: info,
    warning: warning,
    error: error,
    writeToFile: writeToFile
  };
})();
