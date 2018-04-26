const UserModel = require('../src/user/UserModel');
const mongoose = require('mongoose');
const assert = require('assert');
const TweetModel = require('../src/tweet/TweetModel');

// many ways: update, findOneAndUpdate, findByIdAndUpdate

describe('Middleware usermodel', (done) => {
  let joe;
  beforeEach((done) => {
    joe = new UserModel({ username: 'Joe'});
    tweet = new TweetModel({ body: 'the first tweet', date: new Date() });
    joe.tweets.push(tweet);
    Promise.all([joe.save(), tweet.save()])
      .then(() => done());
  });

  it('users cleanup dangling tweets on remove', (done) => {
    joe.remove()
      .then(() => TweetModel.count()).then((count) => {
        assert(count === 0);
        done();
      });
  });

});