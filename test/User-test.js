const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const Hydration = require('../src/Hydration');

describe('User', function() {
  let user;

  beforeEach(function() {
    user = new User({
      id: 1,
      name: 'Luisa Hane',
      address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697', email: 'Diana.Hayes1@hotmail.com',
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8]
    });
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have an id', function() {
    expect(user.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(user.name).to.equal('Luisa Hane');
  });

  it('should have an address', function() {
    expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
  });

  it('should have an email', function() {
    expect(user.email).to.equal('Diana.Hayes1@hotmail.com');
  });

  it('should have a stride length', function() {
    expect(user.strideLength).to.equal(4.3);
  });

  it('should have a daily step goal', function() {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it('should have friends', function() {
    expect(user.friends).to.deep.equal([16, 4, 8]);
  });

  it('should return user\'s first name only', function() {
    expect(user.getUsersFirstName()).to.equal('Luisa');
  });

  it('should keep track of hydration to date', function() {
    let hydration1 = new Hydration(1, "2019/06/15", 37);
    let hydration2 = new Hydration(1, "2019/06/16", 75);
    hydration1.logHydration(user);
    hydration2.logHydration(user)
    expect(user.hydrationToDate.length).to.equal(2);
  });
})
