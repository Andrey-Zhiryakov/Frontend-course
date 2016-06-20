const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = mongoose.Schema({
  author: {type: ObjectId, required: true},
  text: {type: String, required: true},
  date: {type: Date, required: true},
});

commentSchema.statics.addComment(){

}

// TODO:
// delete comment
// edit comment

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
