const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  body: String,
  date: Date
});

module.exports = TweetSchema;