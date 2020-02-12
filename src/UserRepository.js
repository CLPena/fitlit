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

  getAvgSleepQuality(data) {
    let sum = 0;
    data.sleepToDate.forEach(user => sum += user.sleepQuality);
    return Math.round((sum / data.sleepToDate.length));
  }

  getTheWeekOf(date) {
    let givenDate = this.userData.find(day => day.date === date);
    let currentDate = this.userData.indexOf(givenDate);
    let dailyData = this.userData;
    let weeklyData = dailyData.slice(currentDate - 6, currentDate + 1);
    return weeklyData;
  }

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
