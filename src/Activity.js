class Activity {
  constructor(userID, date, numSteps, minutesActive, flightsOfStairs) {
    this.userID = userID;
    this.date = date;
    this.numSteps = numSteps;
    this.minutesActive = minutesActive;
    this.flightsOfStairs = flightsOfStairs;
    this.exceededStepGoal = [];
  }

  getMilesWalkedOn(userData) {
    let stridesInAMile = 5280 / userData.strideLength;
    let stepsInAMile = stridesInAMile * 2;
    let milesWalked = this.numSteps / stepsInAMile;
    return parseFloat(milesWalked.toFixed(2));
  }

  getDailyActiveMinutes() {
    return this.minutesActive;
  }

  getWeeklyActiveMinutes(data, date) {
    let activityData = data.getTheWeekOf(date);
    let avg = 0;
    activityData.forEach(el => {
      avg += el.minutesActive / activityData.length;
    });

    return Math.round(avg);
  }

  compareStepGoal(user, date) {
    return this.date === date ? this.numSteps >= user.dailyStepGoal : 'Select which date you\'d like to view if goal was met';
  }

  getExceededStepGoal(user, activities) {
    return activities.reduce((acc, el) => {
      el.numSteps >= user.dailyStepGoal ? acc.push(el.date) : '';
      return acc;
    }, []);
  }

  getStairClimbingRecord(userData) {
    let record = userData.reduce((acc, el) => {
      if (el.flightsOfStairs > acc) {
        acc = el.flightsOfStairs;
      }
      return acc;
    }, 0);
    return record;
  }

  logActivity(user) {
    user.activityToDate.push(this);
  }
  
  getStairsClimbedForDate(user, givenDate) {
    console.log(user)
    // let totalUserActivity = activityData.filter(el => {
    //   el.userID === this.userID
    // });
    // let matchingDate = totalUserActivity.find(el => {
    //   return el.date === givenDate;
    // });
    // return matchingDate.flightsOfStairs;
    // }
    // go through userData and find the obj with matching date
}
  getStepsTakenForDate(userData, givenDate) {
    // go through userData and find the obj with matching date
  }

  getActiveMinutesForDate(userData, givenDate) {
    // go through userData and find the obj with matching date
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
