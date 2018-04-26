const mongoose = require('mongoose');

const UserModel = require('../src/user/UserModel');

const assert = require('assert');

// many ways: update, findOneAndUpdate, findByIdAndUpdate

describe('Update a user out of the database', (done) => {

  let joe;

  beforeEach((done) => {
    joe = new UserModel({username: 'Joe'});

    joe.save().then((result) => {
      done();
    });
  });

  function assertUsername(operation, done) {
    operation
    .then(() => UserModel.find({})
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].username === 'Alex');
      done();
    })
  )}

  it('model instance update', (done) => {
    joe.set('username', 'Alex');
    assertUsername(joe.save(), done);
  });
  
  it('model instance can update', (done) => {
    
    assertUsername(joe.update({ username: "Alex"}), done);

  });

  it('model class updateFindOne', (done) => {
    done();
  });

  it('model class updateFindById', (done) => {
    done();
  });
});