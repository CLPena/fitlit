const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const UserRepository = require('../src/UserRepository');
const Sleep = require('../src/Sleep');

describe('User', function() {
  let user1;
  let user2;
  let user3;
  let userRepository;

  beforeEach(function() {
    user1 = new User({id: 1, name: 'Luisa Hane', address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697', email: 'Diana.Hayes1@hotmail.com', strideLength: 4.3, dailyStepGoal: 10000, friends: [16, 4, 8]});
    user2 = new User({id: 2, name: 'Jarvis Considine', address: '30086 Kathryn Port, Ciceroland NE 0727330086 Kathryn Port, Ciceroland NE 07273', email: 'Dimitri.Bechtelar11@gmail.com', strideLength: 4.5, dailyStepGoal: 5000, friends: [9, 18, 24, 19]});
    user3 = new User({id: 3, name: 'Herminia Witting', address: '85823 Bosco Fork, East Oscarstad MI 85126-5660', email: 'Elwin.Tromp@yahoo.com', strideLength: 4.4, dailyStepGoal: 5000, friends: [19, 11, 42, 33]});
    userRepository = new UserRepository([user1, user2, user3])
  });

  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', function() {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });

  it('should accept an array of user objects', function() {
    expect(userRepository.userData[0]).to.equal(user1);
    expect(userRepository.userData[1]).to.equal(user2);
    expect(userRepository.userData[2]).to.equal(user3);
  });

  it('should return user\'s data given its id', function() {
    expect(userRepository.getUserData(1)).to.equal(user1)
  });

  it('should return the average step goal amongst all users', function() {
    expect(userRepository.getAvgStepGoal()).to.equal(6667);
  });
  describe('Sleep Data', function() {
    let sleep;
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
      sleep = new Sleep(1, '2019/06/15', 6.1, 2.2);
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
      sleep.log(sleep);
      sleep.log(sleep1);
      sleep.log(sleep2);
      sleep.log(sleep3);
      sleep.log(sleep4);
      sleep.log(sleep5);
      sleep.log(sleep6);
      sleep.log(sleep7);
      sleep.log(sleep8);
      sleep.log(sleep9);
      sleep.log(sleep10);
    });

    it('should find the average sleep quality for all users', function() {
      expect(userRepository.getAvgSleepQuality(sleep)).to.equal(3);
    });
  });
})
