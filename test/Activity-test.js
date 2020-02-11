const chai = require('chai');
const expect = chai.expect;
const Activity = require('../src/Activity');
const User = require('../src/User');
const UserRepository = require('../src/UserRepository');

describe('Activity', function() {
  let user;
  let userRepository;
  let activity1;
  let activity2;
  let activity3;
  let activity4;
  let activity5;
  let activity6;
  let activity7;
  let activity8;

  beforeEach(function() {
    user = new User({
      id: 1,
      name: 'Luisa Hane',
      address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697', email: 'Diana.Hayes1@hotmail.com',
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8]
    });

    activity1 = new Activity(1, '2019/06/15', 3577, 140, 16);
    activity2 = new Activity(1, '2019/06/16', 4294, 138, 10);
    activity3 = new Activity(1, '2019/06/17', 7402, 116, 33);
    activity4 = new Activity(1, '2019/06/18', 3545,  30, 16);
    activity5 = new Activity(1, '2019/06/19', 4377, 140, 11);
    activity6 = new Activity(1, '2019/06/20', 8573, 200, 18);
    activity7 = new Activity(1, '2019/06/21', 6941, 180, 16);
    activity8 = new Activity(1, '2019/06/22', 9841, 80, 16);

    activity1.logActivity(user);
    activity2.logActivity(user);
    activity3.logActivity(user);
    activity4.logActivity(user);
    activity5.logActivity(user);
    activity6.logActivity(user);
    activity7.logActivity(user);
    activity8.logActivity(user);

    userRepository = new UserRepository([activity1, activity2, activity3, activity4, activity5, activity6, activity7, activity8]);
  });

  it('should be a function', function() {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of Activity', function() {
    expect(activity1).to.be.an.instanceof(Activity);
  });

  it('should have an id', function() {
    expect(activity1.userID).to.equal(1)
  });

  it('should have a date', function() {
    expect(activity1.date).to.equal('2019/06/15');
    expect(activity2.date).to.equal('2019/06/16');
    expect(activity3.date).to.equal('2019/06/17');
  });

  it('should track number of steps taken', function() {
    expect(activity1.numSteps).to.equal(3577);
    expect(activity2.numSteps).to.equal(4294);
    expect(activity3.numSteps).to.equal(7402);
  });

  it('should track number of minutes active', function() {
    expect(activity1.minutesActive).to.equal(140);
    expect(activity2.minutesActive).to.equal(138);
    expect(activity3.minutesActive).to.equal(116);
  });

  it('should track flights of stairs climbed', function() {
    expect(activity1.flightsOfStairs).to.equal(16);
    expect(activity2.flightsOfStairs).to.equal(10);
    expect(activity3.flightsOfStairs).to.equal(33);
  });

  it('should return the miles a user has walked based on their number of steps', function() {
    expect(activity1.getMilesWalkedOn(user, '2019/06/15')).to.equal(1.46);
  });

  it('should return how many minutes a user is active on a given day', function() {
    expect(activity1.getDailyActiveMinutes('2019/06/15')).to.equal(140);
    expect(activity2.getDailyActiveMinutes('2019/06/16')).to.equal(138);
    expect(activity3.getDailyActiveMinutes('2019/06/17')).to.equal(116);
  });

  it('should find how many minutes active a user averaged for a given week', function() {
    expect(activity1.getWeeklyAvgActiveMinutes(userRepository, '2019/06/21')).to.equal(135);
    expect(activity1.getWeeklyAvgActiveMinutes(userRepository, '2019/06/22')).to.equal(126);
  });

  it('should find if a user met their step goal for a given day', function() {
    expect(activity1.compareStepGoal(user, '2019/06/15')).to.equal(false);
  });

  it('should find all days where a user exceeded their step goal', function() {
    expect(activity1.getExceededStepGoal(user2, userRepository.userData)).to.deep.equal([activity3.date, activity6.date, activity7.date, activity8.date])
  });

  it('should find a users all time stair climbing record', function() {
    expect(activity1.getStairClimbingRecord(userRepository.userData)).to.equal(33);
  });

  it('should find stairs climbed for a given date', function() {
    expect(activity1.getStairsClimbedForDate(user, '2019/06/16')).to.equal(10);
  })

  it('should find steps taken for a given date', function() {
    expect(activity1.getStepsTakenForDate(user, '2019/06/16')).to.equal(4294);
  })

  it('should find active minutes for a given date', function() {
    expect(activity1.getActiveMinutesForDate(user, '2019/06/16')).to.equal(138);
  })

});
