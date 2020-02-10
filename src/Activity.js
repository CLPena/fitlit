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

  getDailyActiveMinutes(date) {
    return this.minutesActive;
  }

  getWeeklyActiveMinutes(data, dates) {
    let activityData = data.getTheWeekOf(dates);
    let avg = 0;
    activityData.forEach(date => {
      avg += date.minutesActive / activityData.length;
    });

    return Math.round(avg);
  }

  compareStepGoal(goal) {
    return this.numSteps >= goal ? `You reached your step goal of ${goal} today!` : `You did not reach your step goal of ${goal} today.`;
  }

  getStairClimbingRecord() {
    // sort through all of the users activity objects and find the stair climbing record that is the highest
  }



  // Make a metric of your own! Document it, calculate it, and display it. (iteration 3 for sleep)

}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
