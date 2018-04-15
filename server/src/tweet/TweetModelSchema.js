const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TweetModelSchema = new Schema({
  body: String,
  date: Date
});

module.exports = TweetModelSchema;