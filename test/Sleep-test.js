const chai = require('chai');
const expect = chai.expect;
const Sleep = require('../src/Sleep');
const User = require('../src/User');

describe('Sleep', function() {
  let sleep;
  let user;

  beforeEach(function() {
    user = new User({id:1, name: 'Luisa Hane', address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697', email: 'Diana.Hayes1@hotmail.com', strideLength: 4.3, dailyStepGoal: 10000, friends: [16, 4, 8]});
    sleep = new Sleep(1, '2019/06/15', 6.1, 2.2);
  });

  it('should be a function', function() {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of Sleep', function() {
    expect(sleep).to.be.an.instanceof(Sleep);
  });

  describe('Sleep Records', function() {
    let sleep1;
    let sleep2;
    let sleep3;
    let sleep4;
    let sleep5;
    let sleep6;
    let sleep7;
    let sleep8;
    let sleep9;
    let sleep10;

    beforeEach(function() {
      sleep1 = new Sleep(1, '2019/06/16', 7, 4.7);
      sleep2 = new Sleep(1, '2019/06/17', 10.8, 3);
      sleep3 = new Sleep(1, '2019/06/18', 4.1, 2.2);
      sleep4 = new Sleep(1, '2019/06/19', 5.4, 3.6);
      sleep5 = new Sleep(1, '2019/06/20', 9.6, 2.9);
      sleep6 = new Sleep(1, '2019/06/21', 6.1, 3.5);
      sleep7 = new Sleep(1, '2019/06/22', 5.1, 2.2);
      sleep8 = new Sleep(1, '2019/06/23', 8.1, 1.6);
      sleep9 = new Sleep(1, '2019/06/24', 8.9, 3.1);
      sleep10 = new Sleep(1, '2019/06/25', 4.4, 1.2);
      sleep.logSleep(user);
      sleep1.logSleep(user);
      sleep2.logSleep(user);
      sleep3.logSleep(user);
      sleep4.logSleep(user);
      sleep5.logSleep(user);
      sleep6.logSleep(user);
      sleep7.logSleep(user);
      sleep8.logSleep(user);
      sleep9.logSleep(user);
      sleep10.logSleep(user);
    });

    it('should calculate the average hours slept a night', function(){
    expect(sleep.calculateAvgSleepHours(user)).to.equal(7);
    });

    it('should find how many hours a user slept on a given day', function() {
    expect(sleep.findDailySleepHours(user, "2019/06/15")).to.equal(6.1);
    });
  });
});
