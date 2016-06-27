const mongoose = require('mongoose'),
      user = require('./User.js'),
      comment = require('./Comment');
var ObjectId = mongoose.Schema.Types.ObjectId;

var articleSchema = mongoose.Schema({
  title: {type: String, required: true},
  link: {type: String, required: true},
  rating: {type: Number},
  date: Date,
  author: {type: ObjectId, ref: 'User'},
  comments: [{type: ObjectId, ref: 'Comment'}]
});

const NO_ARTICLE_DATA = "Haven't got any article details, try again.";
const NO_ARTICLE_ID = "Did not provide article ID.";

articleSchema.statics.addArticle = (dataObj, cb) => {
  if (!dataObj) return cb({error: NO_ARTICLE_DATA });

  Article.create(dataObj, (err, item) => {
    return err ? cb(err) : cb(null, item);
  });
}

articleSchema.statics.getArticle = (articleId, cb) => {
  if(!articleId) return cb({error: NO_ARTICLE_ID});

  Article.findById(articleId, (err, item) =>{
    return err ? cb(err) : cb(null, item);
  });
}

articleSchema.statics.getArticles = (cb) => {
  Article.find((err, item) => {
    return err ? cb(err) : cb(null, item);
  });
}

articleSchema.statics.editArticle = (dataObj, cb) => {
  if (!dataObj) return cb({error: NO_ARTICLE_DATA });

  Article.findByIdAndUpdate(dataObj._id, dataObj, (err, item)=>{
    return err ? cb(err) : cb(null, item);
  });
}

articleSchema.statics.deleteArticle = (articleId, cb) => {
  if(!articleId) return cb({error: NO_ARTICLE_ID});

  Article.findByIdAndRemove(articleId, (err, item) =>{
    return err ? cb(err) : cb(null, item);
  });
}

articleSchema.statics.addComment = (articleId, dataObj, cb) => {
  if (!articleId) return cb({error: NO_ARTICLE_ID});
  if (!dataObj) return cb({error: `Haven't got any comment data.`});

  Article.findById(articleId, (err, article) => {
    if (err) return cb(err);

    user.findUser(dataObj, (err, usr) => {
      if (err) return cb(err);

      dataObj.author = usr._id;
      dataObj.rating = 0;
      dataObj.date = Date.now();

      comment.addComment(dataObj)
      .then((newComment) => {         // add comment to article
        article.comments.push(newComment._id);

        Article.editArticle(article, (err) => {
          if (err) return cb(err);

          user.addComment(usr._id, newComment._id, err => {
            err ? cb(err) : cb(null, newComment);
          }); //add comment record to user
        });
      })
      .catch((err) => {cb(err)});
    })
  });
}

articleSchema.statics.removeComment = (articleId, dataObj, cb) => {
  if (!articleId) return cb({error: NO_ARTICLE_ID});
  if (!dataObj) return cb({error: `Haven't got any comment data.`});

  Article.findById(articleId, (err, article) => {
    if (err) return cb(err);

    user.findUser(dataObj, (err, usr) => {
      if (err) return cb(err);

      dataObj.author = usr._id;
      dataObj.rating = 0;
      dataObj.date = Date.now();

      comment.deleteComment(dataObj.commentId)
      .then((oldComment) => {         // remove comment from article
        article.comments.splice(article.comments.indexOf(oldComment._id), 1);
        Article.editArticle(article, err => {
          if (err) return cb(err);

          user.removeComment(usr._id, oldComment._id, err => {
            err ? cb(err) : cb(null, oldComment);
          });  //remove comment from user record
        });
      })
      .catch((err) => {cb(err)});
    })
  });
}

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
