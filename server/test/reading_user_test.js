const mongoose = require('mongoose');

const UserModel = require('../src/user/UserModel');

const assert = require('assert');

describe('Reading users out of the database', () => {

  let joe;

  beforeEach((done) => {
    joe = new UserModel({username: 'Joe'});

    joe.save().then((result) => {
      done();
    });
  });

  it('find all the users with name = joe', (done) => {
   UserModel.find({ username: 'Joe' })
    .then((users) => {
      assert(users[0]._id !== joe._id);
      done();
    })
  });
});