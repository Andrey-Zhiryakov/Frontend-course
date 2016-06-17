const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

module.exports = {
  users: require('users'),
  articles: require('articles')
};
