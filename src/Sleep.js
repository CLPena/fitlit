class Sleep {
  constructor(userID, date, hoursSlept, sleepQuality) {
    this.userID = userID;
    this.date = date;
    this.hoursSlept = hoursSlept;
    this.sleepQuality = sleepQuality;
    this.sleepToDate = [];
    this.avgSleepQuality = [];
  }

  // For a user (identified by their userID), the average number of hours slept per day
  getAvgHoursSlept() {
    let avg = this.sleepToDate.reduce((acc, date) => {
      return acc + date.hoursSlept / this.sleepToDate.length;
    }, 0);

    return Math.round(avg);
  }

  // For a user, their average sleep quality per day over all time
  getAvgSleepQuality() {
    let avg = this.sleepToDate.reduce((acc, date) => {
      return acc + date.sleepQuality / this.sleepToDate.length;
    }, 0);

    this.avgSleepQuality.push(Math.round(avg));
    return Math.round(avg);
    };

  //For a user, how many hours they slept for a specific day (identified by a date)
  getHoursSleptOn(date) {
    return this.get(date).hoursSlept;
  }

  //For a user, their sleep quality for a specific day (identified by a date)
  getSleepQualityOn(date) {
    return this.get(date).sleepQuality;
  }

  //For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
  getTheWeekOf(date) {
    let dailyData = this.sleepToDate.filter(data => data.userID === this.userID);
    let currentDate = dailyData.indexOf(this.get(date));
    let weeklyData = dailyData.slice(currentDate - 6, currentDate + 1);
    return weeklyData;
  }

  getHoursSleptTheWeekOf(date) {
    let week = this.getTheWeekOf(date);
    let hoursSlept = week.map(day => day.hoursSlept);
    return hoursSlept;
  }

  getSleepQualityTheWeekOf(date) {
    let week = this.getTheWeekOf(date);
    let quality = week.map(day => day.sleepQuality);
    return quality;
  }

  // Find all users who average a sleep quality greater than 3 for a given week (7 days) - you should be able to calculate this for any week, not just the latest week
  getBestSleepersTheWeekOf(date) {
    let week = this.getTheWeekOf(date);
    let bestSleepers = week.filter(day => {
      if (day.sleepQuality > 3) {
        return day;
      }
    });
    console.log('bestSleepers', bestSleepers)
    return bestSleepers;
  }


  // For a given day (identified by the date), find the users who slept the most number of hours (one or more if they tied)
  getMostRestedUserOn(date) {
    let daily = this.sleepToDate.filter(el => el.date === date);
    let mostRested = daily.sort((a, b) => b.hoursSlept - a.hoursSlept);
    return mostRested.filter(el => mostRested[0].hoursSlept === el.hoursSlept);
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
