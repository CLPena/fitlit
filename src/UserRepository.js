class UserRepository {
  constructor(userData) {
    this.userData = userData;
    // this.users = [];
  }

  getUserData(id) {
    return this.userData.find(user => user.id === id);
  }

  getAvgStepGoal() {
    let goals = 0;
    this.userData.forEach(user => goals += user.dailyStepGoal);
    return Math.round(goals / this.userData.length);
  }

  getAvgSleepQuality(data) {
    let sum = 0;
    data.sleepToDate.forEach(user => sum += user.sleepQuality);
    return Math.round((sum / data.sleepToDate.length));
  }

  getBestSleeper() {
    // For a given day (identified by the date), find the users who slept the most number of hours (one or more if they tied)
  }

  // Make a metric of your own! Document it, calculate it, and display it. (iteration 3 for sleep)

  getDailyActivityAvgs() {
    // stairs climbed for a specified date
    // steps taken for a specific date
    // minutes active for a specific date
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
