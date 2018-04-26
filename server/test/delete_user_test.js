const mongoose = require('mongoose');

const UserModel = require('../src/user/UserModel');

const assert = require('assert');

// many ways: remove, findOneAndRemove, findByIdAndRemove

describe('Delete a user out of the database', (done) => {

  let joe;

  beforeEach((done) => {
    joe = new UserModel({username: 'Joe'});

    joe.save().then((result) => {
      done();
    });
  });

  it('model instance remove', (done) => {
    joe.remove().then(() => {
      UserModel.findOne({ name: 'Joe' })
      .then((result) => {
        assert(!result);
        done();
      })
    })
  });
  
  it('model class remove', (done) => {
    UserModel.remove({ name: 'Joe' }).then(() => {
      UserModel.findOne({ name: 'Joe' })
      .then((result) => {
        assert(!result);
        done();
      })
    })
  });

  it('model class removeFindOne', (done) => {
    done();
  });

  it('model class removeFindById', (done) => {
    done();
  });
});