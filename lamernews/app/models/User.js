const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: String,
  registrationDate: Date,
  postedComments: [{type: ObjectId, ref: 'Comment'}],
  postedArticles: [{type: ObjectId, ref: 'Article'}]
});

userSchema.statics.addUser = (dataObj, cb) => {
  if (!dataObj) return cb({error: "Haven't got any user details, try again."});
  User.count({username: dataObj.username}, (err, count)=>{
    if (!count) {
      User.create(dataObj, (err, item) => {
        return err ? cb(err) : cb(null, item);
      });
    } else {
      cb({error: "This username is alleady exists."})
    }
  });
}

userSchema.statics.findUser = (dataObj, cb) => {

}

userSchema.statics.editUser = (dataObj, cb) => {

}

userSchema.statics.deleteUser = (dataObj, cb) => {

}

var User = mongoose.model('User', userSchema);

module.exports = User;
