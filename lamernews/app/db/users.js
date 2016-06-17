const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    registration date: Date,
    postedComments: [],
    postedArticles: []
});
