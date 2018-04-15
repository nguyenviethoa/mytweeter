const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TweetSchema = require('../tweet/TweetModelSchema');

const UserSchema = new Schema({
  username: {
    type: String,
    validate: {
      validator: (username) => { username.length > 2 },
      message: "username must be longer than 2 characters."
    },
    required: [true, 'username is required']
  },  
  first_name: String,
  last_name: String,
  full_name: String,
  avatar_url: String,
  tweets: [TweetSchema]
});

UserSchema.virtual('tweetsCount').get(function() {
  return this.tweets.length;
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;