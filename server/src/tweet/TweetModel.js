const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  body: String,
  date: Date,
  stats: {
    type: Schema.Types.ObjectId,
    ref: 'stats'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'user Id is required to create tweet']
  },
});

const TweetModel = mongoose.model('tweet', TweetSchema);

module.exports = TweetModel;