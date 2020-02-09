class UserRepository {
  constructor(userData) {
    this.userData = userData;
  }

  getUserData(id) {
    return this.userData.find(user => user.id === id);
  }

  getAvgStepGoal() {
    let sum = 0;
    this.userData.forEach(user => sum += user.dailyStepGoal);
    return Math.round(sum / this.userData.length);
  }

  //For all users, the average sleep quality
  getAvgSleepQuality(data) {
    let sum = 0;
    data.sleepToDate.forEach(user => sum += user.sleepQuality);
    return Math.round((sum / data.sleepToDate.length));
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
