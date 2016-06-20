const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.Schema({
  title: {type: String, required: true}
  link: {type: String, required: true},
  rating: {type: Number},
  date: Date,
  author: [{type: ObjectId, ref: 'User'}],
  comments: [{type: ObjectId, ref: 'Comment'}]
});
