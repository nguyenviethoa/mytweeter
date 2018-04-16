const mongoose = require('mongoose');

const UserModel = require('../src/user/UserModel');

const assert = require('assert');

describe('Reading users out of the database', () => {

  let joe, alex, maria, jack;

  beforeEach((done) => {
    joe = new UserModel({username: 'Joe'});
    alex = new UserModel({username: 'Alex'});
    maria = new UserModel({username: 'Maria'});
    jack = new UserModel({username: 'Jack'});

    Promise.all([joe.save(), alex.save(), maria.save(), jack.save()]).then(() => done());;
  });

  it('find all the users with name = joe', (done) => {
   UserModel.find({ username: 'Joe' })
    .then((users) => {
      assert(users[0]._id !== joe._id);
      done();
    })
  });

  it('can skip and limit users list', (done) => {
    UserModel.find({})
    .sort({ username: 1}).skip(1).limit(2)
    .then((users) => {
      assert(users.length === 2);
      assert(users[0].username === 'Jack');
      done();
    });
  })
});