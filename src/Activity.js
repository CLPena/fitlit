class Activity {
  constructor(userID, date, numSteps, minutesActive, flightsOfStairs) {
    this.userID = userID;
    this.date = date;
    this.numSteps = numSteps;
    this.minutesActive = minutesActive;
    this.flightsOfStairs = flightsOfStairs;
    this.exceededStepGoal = [];
  }

  getMilesWalkedOn(userData, date) {
    let stridesInAMile = 5280 / userData.strideLength;
    let stepsInAMile = stridesInAMile * 2;
    let milesWalked = this.numSteps / stepsInAMile;
    return parseFloat(milesWalked.toFixed(2));
  }

  // For a user, (identified by their userID) how many minutes were they active for a given day (specified by a date)?
  getDailyActiveMinutes(date) {
    return this.minutesActive;
  }

  getWeeklyActiveMinutes(data, dates) {
    let activityData = data.getTheWeekOf(dates);
    console.log('this is it: ', activityData)
    let avg = 0;
    activityData.forEach(date => {
      avg += date.minutesActive / activityData.length;
    });

    return Math.round(avg);
  }

  compareStepGoal() {
    // find user data with matching date and compare step goal to actual steps
    // see if it exceeds step goal, if so push into exceeded step goal array
  }

  getStairClimbingRecord() {
    // sort through all of the users activity objects and find the stair climbing record that is the highest
  }



  // Make a metric of your own! Document it, calculate it, and display it. (iteration 3 for sleep)

}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
