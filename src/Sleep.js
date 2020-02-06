class Sleep {
  constructor(userID, date, hoursSlept, sleepQuality) {
    this.userID = userID;
    this.date = date;
    this.hoursSlept = hoursSlept;
    this.sleepQuality = sleepQuality;
    this.sleepToDate = [];
  }

  getAvgHoursSlept() {
    let avg = this.sleepToDate.reduce((acc, date) => {
      return acc + date.hoursSlept / this.sleepToDate.length;
    }, 0);
    return Math.round(avg);
  }

  getAvgSleepQuality() {
    let avg = this.sleepToDate.reduce((acc, date) => {
      return acc + date.sleepQuality / this.sleepToDate.length;
    }, 0);
    return Math.round(avg);
  }

  get(date) {
    return this.sleepToDate.find(day => day.date === date);
  }

  getHoursSleptOn(date) {
    return this.get(date).hoursSlept;
  }

  getSleepQualityOn(date) {
    return this.get(date).sleepQuality;
  }

  getTheWeekOf(date) {
    let dailyData = this.sleepToDate.filter(data => data.userID === this.userID);
    let currentDate = dailyData.indexOf(this.get(date));
    let weeklyData = dailyData.slice(currentDate - 6, currentDate + 1);
    return weeklyData;
  }

  log(sleepData) {
    this.sleepToDate.push(sleepData);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
