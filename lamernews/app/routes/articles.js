const log = require('../utils/log.js').info;

exports.getRandomArticle = function(req, res) {
  log(JSON.stringify(req.params));
  res.send({  // temproary plug
    name: "name",
    date: Date.now()
  });
};

exports.getArticles = function(req, res) {
  log(JSON.stringify(req.params), req.query.sort);
  res.send(req.path);
};

exports.createArticle = function(req, res) {
  log(JSON.stringify(req.params));
  res.send(req.path);
};

exports.updateArticle = function(req, res) {
  log(JSON.stringify(req.params));
  res.send(req.path);
};

exports.deleteArticle = function(req, res) {
  log(JSON.stringify(req.params));
  res.send(req.path);
};
