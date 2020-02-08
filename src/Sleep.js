class Sleep {
  constructor(userID, date, hoursSlept, sleepQuality) {
    this.userID = userID;
    this.date = date;
    this.hoursSlept = hoursSlept;
    this.sleepQuality = sleepQuality;
    this.sleepToDate = [];
    this.avgSleepQuality = [];
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

    this.avgSleepQuality.push(Math.round(avg));
    return Math.round(avg);
  }

  getMostRestedUserOn(date) {
    let daily = this.sleepToDate.filter(el => el.date === date);
    let mostRested = daily.sort((a, b) => b.hoursSlept - a.hoursSlept);
    return mostRested.filter(el => mostRested[0].hoursSlept === el.hoursSlept);
  }

  getHoursSleptOn(date) {
    return this.get(date).hoursSlept;
  }

  getSleepQualityOn(date) {
    return this.get(date).sleepQuality;
  }

  getHoursSleptTheWeekOf(date) {
    let dailyData = this.sleepToDate.filter(data => data.userID === this.userID);
    let currentDate = dailyData.indexOf(this.get(date));
    let weeklyData = dailyData.slice(currentDate - 6, currentDate + 1);
    return weeklyData;
  }

  log(sleepData) {
    this.sleepToDate.push(sleepData);
  }

  get(date) {
    return this.sleepToDate.find(day => day.date === date);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
