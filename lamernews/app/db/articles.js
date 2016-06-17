const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    title: String,
    author: String,
    link: String,
    rating: Number,
    date: Date,
    comments: []
});
