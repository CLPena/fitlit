class Sleep {
  constructor(userID, date, hoursSlept, sleepQuality) {
    this.userID = userID;
    this.date = date;
    this.hoursSlept = hoursSlept;
    this.sleepQuality = sleepQuality;
  }

  calculateAvgSleepHours(user) {
    let sleepToDate = user.sleepToDate;
    let dailySleep = [];
    sleepToDate.forEach(sleep => {
      dailySleep.push(sleep.hoursSlept)
    });
    let sum = dailySleep.reduce((acc, hours) => {
      return acc + hours;
    },0);
    let avgHours = sum / dailySleep.length;
    return Math.round(avgHours);
  }

  findDailySleepHours(user, givenDate) {
    let sleepToDate = user.sleepToDate;
    let matchingDate = sleepToDate.find(hours => {
      return hours.date === givenDate;
    });
    return matchingDate.hoursSlept;
  }

  findWeeklySleepHours() {
    // HOURS SLEPT EACH DAY OVER THE COURSE OF A GIVEN WEEK
  }

  logSleep(user) {
    user.sleepToDate.push(this);
  }

  findWeeklySleepQuality() {
    // SLEEP QUALITY EACH DAY OVER THE COURSE OF A GIVEN WEEK
  }

  findDailySleepQuality() {
    // FIND THE SLEEP QUALITY FOR A SPECIFIC DAY
  }

  calculateAvgSleepQuality() {
    // THE AVG SLEEP QUALITY PER DAY FOR ALL TIME
  }
}





if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
