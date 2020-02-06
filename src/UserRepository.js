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

  getAvgSleepQuality() {
    // GO THROUGH ALL USERS AND PULL ALL OF THEIR SLEEP OBJECTS AND FROM THAT PULL THE SLEEP QUALITY AND ADD ALL OF SLEEP QUALITY NUMBERS AND DIVIDE IT BUT THE TOTAL NUMBER
  }

  getGoodSleepers() {
    // Find all users who average a sleep quality greater than 3 for a given week (7 days) - you should be able to calculate this for any week, not just the latest week
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
