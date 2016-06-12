const express = require('express'),
    app = express(),
    routes = require('./app/config/routes'),
    logger = require('./app/utils/log'),
    log = logger.info;

logger.writeToFile();

app.use('/', express.static('./public'));

app.listen(Number(process.env.PORT || 3000), function() {
  log("Server is listening on port", Number(process.env.PORT || 3000));
});
