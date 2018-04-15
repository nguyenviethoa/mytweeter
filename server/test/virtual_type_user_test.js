const assert = require('assert');
const UserModel = require('../src/user/UserModel');

describe('tweets count virtual types', () => {
  it('tweets count return number of tweets', (done) => {
    const joe = new UserModel({ username: "joe", tweets: [{ body: "the first tweet"}] });
    joe.save()
    .then(() => UserModel.findOne({ username: "joe"}))
    .then((user) => {
      assert(user.tweetsCount === 1);
      done();
    })
  })
})