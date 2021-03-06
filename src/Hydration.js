class Hydration {
  constructor(userID, date, numOunces) {
    this.userID = userID;
    this.date = date;
    this.numOunces = numOunces;
  }

  calculateAvgHydration(user) {
    let hydrationToDate = user.hydrationToDate;
    let dailyOunces = [];
    hydrationToDate.forEach(hydration => {
      dailyOunces.push(hydration.numOunces)
    })
    let ouncesSum = dailyOunces.reduce((acc, number) => {
      return acc + number;
    }, 0);
    let avgDailyOunces = ouncesSum / dailyOunces.length
    return Math.round(avgDailyOunces);
  }

  findDailyHydration(user, givenDate) {
    let hydrationToDate = user.hydrationToDate;
    let matchingDate = hydrationToDate.find(hydration => {
      return hydration.date === givenDate;
    });
    return matchingDate.numOunces;
  }

  findWeeklyHydration(user, givenDate) {
    let hydrationToDate = user.hydrationToDate;
    let userHydration = hydrationToDate.filter(hydration => hydration.userID === this.userID);
    let givenDateHydration = userHydration.find(hydration => hydration.date === givenDate);
    let givenDateIndex = userHydration.indexOf(givenDateHydration);
    let weeklyHydration = userHydration.slice(givenDateIndex - 6, givenDateIndex + 1);
    return weeklyHydration;
  }

  logHydration(user) {
    user.hydrationToDate.push(this);
  }

}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
