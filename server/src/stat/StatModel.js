const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StatSchema = new Schema({
  views: Number,
  likes: Number,
  retweets: Number,
  responses: Number,
  tweet: {
    type: Schema.Types.ObjectId,
    ref: 'tweet'
  }
});

const StatModel = mongoose.model('stats', StatSchema);

module.exports = StatModel;