const mongoose = require('mongoose');

const UserModel = require('../src/user/UserModel');

const assert = require('assert');

describe('Creating new user', () => {
  it('save a user', (done) => {
    const joe = new UserModel({username: 'Joe'});

    joe.save().then((result) => {
      assert(!joe.isNew);
      done();
    });
  });
});