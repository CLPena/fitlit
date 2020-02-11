window.addEventListener('load', getUserInfo);

let wrapper = document.querySelector('main');
let body = document.querySelector('body');

function getUserInfo() {
  let userRepository = new UserRepository(userData);
  let user = new User(userData[0]);
  createDashboard(user, userRepository);
  getHydrationInfo(user);
  getSleepInfo(user);
  getActivityInfo(user);
}

function createDashboard(user, userRepository) {
  body.insertAdjacentHTML('afterBegin',
    `<header>
      <h1>Welcome, <span>${user.getUsersFirstName()}</span>!<h1>
    </header>`)
  wrapper.insertAdjacentHTML('afterBegin', `
    <section class='one'>
      <p>ADDRESS</p>
      <p class='user-data'>${user.address}</p>
      <p>EMAIL</P>
      <p class='user-data'>${user.email}</p>
      <p>STRIDE-LENGTH</p>
      <p class='user-data'>${user.strideLength}</p>
      <p>DAILY-STEP-GOAL <span>VS</span> AVERAGE-STEP-GOAL</p>
      <p class='user-data'>${user.dailyStepGoal} | ${userRepository.getAvgStepGoal()}</p>
      <p>FRIENDS</p>
      <p class='user-data'>${userData[15].name} | ${userData[3].name} | ${userData[7].name}</p>
    </section>
  `);
}

function getHydrationInfo(user) {
  let userHydrationData = hydrationData.filter(el => el.userID === user.id);
  let userHydrationDataObjs = userHydrationData.map(el => {
    return new Hydration(el.userID, el.date, el.numOunces)
  });
  user.hydrationToDate = user.hydrationToDate.concat(userHydrationDataObjs);
  let dailyHydration = user.hydrationToDate.find(el => el.date === "2019/06/28");
  let weeklyHydration = dailyHydration.findWeeklyHydration(user, "2019/06/28");
  createDailyHydrationWidget(dailyHydration);
  createWeeklyHydrationWidget(weeklyHydration);
}

function createDailyHydrationWidget(dailyHydration) {
  wrapper.insertAdjacentHTML('beforeEnd',
    `<section class='two'>
      <p class='ounces-of-water-today'>OUNCES OF WATER TODAY:</p>
      <p class='ounces-of-water-today'>${dailyHydration.numOunces} OZ</p>
    </section>`
  )
}

function createWeeklyHydrationWidget(weeklyHydration) {
  let weeklyWater = weeklyHydration.map(el => {
    return `<div class='weekly-water'>
      <p>DATE: ${el.date}<p>
      <p>${el.numOunces} OZ<p>
    </div>`
  })
  wrapper.insertAdjacentHTML('beforeEnd',
    `<section class='three'>
      <p>OUNCES OF WATER PAST 7 DAYS:</p>
      ${weeklyWater.join(" ")}
    </section>`
  )
}

function getSleepInfo(user) {
  let userSleepData = sleepData.filter(el => el.userID === user.id);
  let userSleepDataObjs = userSleepData.map(el => {
    let newSleep = new Sleep(el.userID, el.date, el.hoursSlept, el.sleepQuality);
    newSleep.sleepToDate = newSleep.sleepToDate.concat(userSleepData);
    return newSleep;
  });
  user.sleepToDate = user.sleepToDate.concat(userSleepDataObjs);
  let dailySleep = user.sleepToDate.find(el => el.date === "2019/06/28");
  let weeklySleep = dailySleep.getTheWeekOf("2019/06/28");
  createDailySleepWidget(dailySleep);
  createWeeklySleepWidget(weeklySleep)
}

function createDailySleepWidget(dailySleep) {
  wrapper.insertAdjacentHTML('beforeEnd',
    `<section class='four'>
      <p class='sleep-today'>HOURS SLEPT LAST NIGHT:</p>
      <p class='hours-slept-last-night'>${dailySleep.hoursSlept} hours</p>
      <p class='sleep-today'>SLEEP QUALITY LAST NIGHT:</p>
      <p class='hours-slept-last-night'>${dailySleep.sleepQuality}</p>
      <p class='sleep-today'>ALL-TIME AVERAGE HOURS SLEPT:</p>
      <p class='hours-slept-last-night'>${dailySleep.getAvgHoursSlept()}</p>
      <p class='sleep-today'>ALL-TIME AVERAGE SLEEP QUALITY:</p>
      <p class='hours-slept-last-night'>${dailySleep.getAvgSleepQuality()}</p>
    </section>`
  )
}

function createWeeklySleepWidget(weeklySleep) {
  let weeklySleepHTML = weeklySleep.map(el => {
    return `<div class='weekly-sleep'>
      <p>DATE: ${el.date}<p>
      <p>${el.hoursSlept} hours slept | ${el.sleepQuality} quality<p>
    </div>`
  })
  wrapper.insertAdjacentHTML('beforeEnd',
    `<section class='five'>
      <p>PAST 7 DAYS OF SLEEP:</p>
      ${weeklySleepHTML.join(" ")}
    </section>`
  )
}

function getActivityInfo(user) {
  let userActivityDataObjs = activityData.filter(el => el.userID === user.id).map(el => {
    return new Activity(el.userID, el.date, el.numSteps, el.minutesActive, el.flightsOfStairs)
  });
  user.activityToDate = user.activityToDate.concat(userActivityDataObjs);
  let dailyUserActivity = user.activityToDate.find(el => el.date === "2019/06/28");
  let allUserActivityTodayDataObjs = activityData.filter(el => el.date === "2019/06/28").map(el => {
    return new Activity(el.userID, el.date, el.numSteps, el.minutesActive, el.flightsOfStairs)
  });
  handleDailyActivity(dailyUserActivity, allUserActivityTodayDataObjs, user, userActivityDataObjs)
}

function handleDailyActivity(dailyUserActivity, allUserActivityTodayDataObjs, user, userActivityDataObjs) {
  let totalActiveMinsAvg = getActiveMinutesInfo(allUserActivityTodayDataObjs);
  let totalStepsAvg = getStepsInfo(allUserActivityTodayDataObjs);
  let totalFlightsAvg = getFlightsInfo(allUserActivityTodayDataObjs);
  let totalMilesAvg = getMilesWalkedInfo(allUserActivityTodayDataObjs, user);
  createDailyActivityWidget(dailyUserActivity, user, totalActiveMinsAvg, totalStepsAvg, totalFlightsAvg, totalMilesAvg);
  createWeeklyActivityWidget(userActivityDataObjs);
}

function getActiveMinutesInfo(allUserActivityTodayDataObjs) {
  let minutesActiveToday = allUserActivityTodayDataObjs.reduce((acc, number) => {
    acc += number.minutesActive;
    return acc;
  }, 0);
  let minutesActiveAvgToday = Math.round(minutesActiveToday / allUserActivityTodayDataObjs.length);
  return minutesActiveAvgToday;
}

function getStepsInfo(allUserActivityTodayDataObjs) {
  let stepsToday = allUserActivityTodayDataObjs.reduce((acc, number) => {
    acc += number.numSteps;
    return acc;
  }, 0);
  let stepsAvgToday = Math.round(stepsToday / allUserActivityTodayDataObjs.length);
  return stepsAvgToday;
}

function getFlightsInfo(allUserActivityTodayDataObjs) {
  let flightsClimbedToday = allUserActivityTodayDataObjs.reduce((acc, number) => {
    acc += number.flightsOfStairs;
    return acc;
  }, 0);
  let flightsClimbedAvgToday = Math.round(flightsClimbedToday / allUserActivityTodayDataObjs.length);
  return flightsClimbedAvgToday;
}

function getMilesWalkedInfo(allUserActivityTodayDataObjs, user) {
  let milesWalkedToday = allUserActivityTodayDataObjs.reduce((acc, number) => {
    acc += number.getMilesWalkedOn(user);
    return acc;
  }, 0);
  let milesAvgToday = Math.round(milesWalkedToday / allUserActivityTodayDataObjs.length);
  return milesAvgToday;
}

function createDailyActivityWidget(dailyUserActivity, user, totalActiveMinsAvg, totalStepsAvg, totalFlightsAvg, totalMilesAvg) {
  wrapper.insertAdjacentHTML('beforeEnd',
    `<section class='six'>
      <p class='activity-today'>ACTIVITY TODAY:</p>
      <p class='activity-today'>STEPS: ${dailyUserActivity.numSteps}</p>
      <p class=activity-today'>MILES: ${dailyUserActivity.getMilesWalkedOn(user)}</p>
      <p class=activity-today'>ACTIVE MINUTES: ${dailyUserActivity.minutesActive}</p>
      <p class=activity-today'>FLIGHTS: ${dailyUserActivity.flightsOfStairs}</p>
      <p class='activity-today'>AVERAGE USER TODAY:</p>
      <p class='activity-today'>STEPS: ${totalStepsAvg}</p>
      <p class='activity-today'>MILES: ${totalMilesAvg}</p>
      <p class='activity-today'>ACTIVE MINUTES: ${totalActiveMinsAvg}</p>
      <p class='activity-today'>FLIGHTS: ${totalFlightsAvg}</p>
    </section>`
  )
}

function createWeeklyActivityWidget(userActivityDataObjs) {
  let givenDate = userActivityDataObjs.find(day => day.date === "2019/06/28");
  let currentDate = userActivityDataObjs.indexOf(givenDate);
  let weeklyData = userActivityDataObjs.slice(currentDate - 6, currentDate + 1);

  let weeklyActivity = weeklyData.map(el => {
    return `
    <div class='weekly-activity'>
      <p>DATE: ${el.date}</p>
      <p>STEP COUNT: ${el.numSteps} | FLIGHTS OF STAIRS: ${el.flightsOfStairs} | MINS ACTIVE: ${el.minutesActive}</p>
    </div>
    `
  });
    wrapper.insertAdjacentHTML('beforeEnd',
      `<section class='seven'>
        <p>ACTIVITY PAST 7 DAYS:</p>
        ${weeklyActivity.join(" ")}
      </section>`
    )
}
