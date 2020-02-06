const chai = require('chai');
const expect = chai.expect;
const Activity = require('../src/Activity');

describe('Activity', function() {
  let activity;

  beforeEach(function() {
    activity = new Activity(1, '2019/06/15', 3577, 140, 16);
  });

  it('should be a function', function() {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of Activity', function() {
    expect(activity).to.be.an.instanceof(Activity);
  });

  it('should have an id', function() {
    expect(activity.userID).to.equal(1);
  });

  it('should have a date', function() {
    expect(activity.date).to.equal('2019/06/15');
  });

  it('should track number of steps taken', function() {
    expect(activity.numSteps).to.equal(3577);
  });

  it('should track number of minutes active', function() {
    expect(activity.minutesActive).to.equal(140);
  });

  it('should track flights of stairs climbed', function() {
    expect(activity.flightsOfStairs).to.equal(16);
  });

  
});
