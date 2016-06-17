const express = require('express'),
    app = express(),
    routes = require('./app/routes'),
    logger = require('./app/utils/log'),
    log = logger.info;

logger.writeToFile();

app.use('/', function(req, res, next){
  log('Receive request to',req.path, JSON.stringify(req.params));
  next();
});

app.get('/articles/:startIndex/:count', routes.articles.getArticles);

app.get('/articles/random', routes.articles.getRandomArticle);

app.post('/articles/', routes.articles.createArticle);

app.put('/articles/:id', routes.articles.updateArticle);

app.delete('/articles/:id', routes.articles.deleteArticle);

app.get('/users/:username', routes.users.getUser);

app.post('/users/:username', routes.users.createUser);

app.put('/users/:username', routes.users.updateUser);

app.delete('/users/:username', routes.users.deleteUser);

app.get('/about', function (req, res) {
    log(req.path);
    res.send('About page');
});

app.use('/', express.static('./public'));

app.use(function(req, res, next){
  log('404', 'not found, path:',req.path);
  res.status(404);
  res.sendFile(__dirname+'/public/404.html');
  return;
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  logger.error(`Internal error(${res.statusCode}): ${err.message}`);
  res.send({ error: err.message });
  return;
});

app.listen(Number(process.env.PORT || 3000), function() {
  log("Server is listening on port", Number(process.env.PORT || 3000));
});
