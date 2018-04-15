const assert = require('assert');
const UserModel = require('../src/user/UserModel');
const TweetModel = require('../src/tweet/TweetModel');
const StatModel = require('../src/stat/StatModel');

describe('Associations tests', () => {
  let joe, tweet, stat;
  
  beforeEach((done) => {
    joe = new UserModel({ username: 'Joe', tweets: [] });
    tweet = new TweetModel({ body: 'the first tweet', date: new Date()});
    stat = new StatModel({views: 10 });

    joe.tweets.push(tweet);
    tweet.stats = stat;
    stat.tweet = tweet;

    Promise.all([ joe.save(), tweet.save(), stat.save()])
      .then(() => done());
  });

  it.only('tweet user stat associations', (done) => {
    UserModel.find({ username: 'Joe'})
      .then((user) => {
        console.log('user', user);
      })
    done();
  })
})