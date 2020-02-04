class Hydration {
  constructor(userID, date, numOunces) {
    // this.hydrationData = hydrationData;
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
    // USE THE USER.hydrationToDate TO CALCULATE THE AVG FLUID OZ PER DAY OF ALL TIME
  }

  findDailyHydration(user, givenDate) {
    let hydrationToDate = user.hydrationToDate;
    let matchingDate = hydrationToDate.find(hydration => {
      return hydration.date === givenDate;
    });
    return matchingDate.numOunces;
    // GO THROUGH THE USER.hydrationToDate ARRAY TO FIND THE OBJECT WITH MATCHING DATE
  }

  findWeeklyHydration(user, givenDate) {
    let hydrationToDate = user.hydrationToDate;
    let userHydration = hydrationToDate.filter(hydration => hydration.userID === this.userID);
    // let givenDateIndex = userHydration.indexOf(givenDate);
    console.log(userHydration);
    // USE THE USER.hydrationToDate TO find How many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day
  }

}




if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
