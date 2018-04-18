const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://nguyenviethoa:Taptrung9@ds237989.mlab.com:37989/mytweeter');
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
