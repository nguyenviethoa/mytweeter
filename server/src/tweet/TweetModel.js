const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  body: String,
  date: Date,
  stats: {
    type: Schema.Types.ObjectId,
    ref: 'stat'
  }
});

const TweetModel = mongoose.model('tweet', TweetSchema);

module.exports = TweetModel;