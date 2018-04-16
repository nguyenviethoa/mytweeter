const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://opentechiz:opentechiz@45.32.125.3:27017/tweeterOpentechiz');
  mongoose.connection.
    once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  const { users, stats, tweets } = mongoose.connection.collections;
  users.drop(() => {
    tweets.drop(() => {
      stats.drop(() => {
        done()
      });
    });
  });
});
