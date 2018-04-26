const UserModel = require('../src/user/UserModel');

const assert = require('assert');

// many ways: update, findOneAndUpdate, findByIdAndUpdate

describe('Validate username', (done) => {

  it('require a username', (done) => {
    const user = new UserModel( {
      username: undefined
    });
    const validationResult = user.validateSync();
    // user.validate((validationResult) => {});
    const { message } = validationResult.errors.username;
    assert(message === 'username is required');
    done();
  });

  xit('requires username longer than 2 characters.', (done) => {
    const user = new UserModel({ username: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.username;
    assert(message === 'username must be longer than 2 characters.');
    done();
  })

});