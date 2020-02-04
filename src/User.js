const Hydration = require('../src/Hydration');

class User {
  constructor(userDataObj) {
    this.id = userDataObj.id;
    this.name = userDataObj.name;
    this.address = userDataObj.address;
    this.email = userDataObj.email;
    this.strideLength = userDataObj.strideLength;
    this.dailyStepGoal = userDataObj.dailyStepGoal;
    this.friends = userDataObj.friends;
    this.hydrationToDate = [];
    this.activityToDate = [];
    this.sleepToDate = [];
  }

  getUsersFirstName() {
    // RETURNS THE USERS FIRST NAME ONLY
    return this.name.split(' ')[0];
  }

  logHydration(userId, date, numOunces) {
    var hydration = new Hydration(this.id, date, numOunces);
    this.hydrationToDate.push(hydration);
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
