const assert = require('assert');
const UserModel = require('../src/user/UserModel');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new UserModel({ username: "joe", tweets: [{ body: "the first tweet"}] });
    joe.save()
    .then(() => UserModel.findOne({ username: "joe"}))
    .then((user) => {
      assert(user.tweets[0].body === 'the first tweet');
      done();
    })
  })
})