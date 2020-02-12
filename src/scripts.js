window.addEventListener('load', getUserInfo);

let wrapper = document.querySelector('main');
let body = document.querySelector('body');

function getUserInfo() {
  let userRepository = new UserRepository(userData);
  let user = new User({
    id: 1,
    name: 'Luisa Hane',
    address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697', email: 'Diana.Hayes1@hotmail.com',
    strideLength: 4.3,
    dailyStepGoal: 10000,
    friends: [16, 4, 8]
  });
  createDashboard(user, userRepository);
  getHydrationInfo(user);
  getSleepInfo(user);
  getActivityInfo(user);
  getFriends(user, userRepository);
  getIncreasingSteps(user);
}

// Calculate and display this trend: for a user, what days had increasing steps for 3 or more days?
function getIncreasingSteps(user) {
  let stepIncrementer = 0;

  user.activityToDate.reduce((acc, el) => {

    if (el.numSteps > stepIncrementer) {
      // console.log(el.date, el.numSteps)
      stepIncrementer = el.numSteps;
      acc.counter = stepIncrementer;
      acc.increasingSteps.push(el.date)
      if (acc.increasingSteps.length >= 3) {
        // console.log('acc counter & steps: ', acc.counter, acc.increasingSteps)

      }
    } else {
      // console.log(el.date, el.numSteps)

      acc.counter = 0;
      acc.increasingSteps = [];
      stepIncrementer = el.numSteps;
      // console.log('acc: ', acc)
    }
    return acc;
  }, {counter: 0, increasingSteps: []})

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
      <p class='user-data'>${userData[45].name} | ${userData[46].name} | ${userData[47].name}</p>
    </section>
  `);
}

function getFriends(user, userRepository) {
// output: array of objects with each friends activity data for the last 7 dailySleep

// {day1: [{name: sarah, steps: 23423, flights: 4}, {name: joe, steps:23454, flights: 4}],
// day2: [{name: sarah, steps: 678768, flights: 43333}, {name: joe, steps:006, flights: 0}]
// }
  let weekDates = ["2019/06/28", "2019/06/27", "2019/06/26", "2019/06/25", "2019/06/24", "2019/06/23", "2019/06/22"];
  let yes;
  let blah = [];
  let usersOnGivenDate = [];

  // FOR EACH DATE OF THE WEEK ...
  weekDates.forEach(date => {

    // FILTER THROUGH ACTIVITY DATA ...
    let allUsersOnGivenDate = activityData.filter(day => {

      // IF DATA'S DATE === A DATE IN OUR WEEK ...
      if (day.date === date) {

        // PUSH ACTIVITY OBJ TO USERS ON GIVEN DAY ARRAY ...
        addFriendsToArray(user, day, usersOnGivenDate);
        // GO THROUGH usersOnGivenDate ARRAY ...
          // REDUCE FUNCTION ...

        // yes = usersOnGivenDate.reduce((acc, el) => {
        //     blah.push(el);
        //     acc[date] = blah;
        //
        //   return acc;
        // }, {});

      }; // (end of the if statement in the filter loop)
    }); // (end of the filter loop)
  }); // (end of the forEach loop)

  // console.log('usersOnGivenDate', usersOnGivenDate);
  yes = usersOnGivenDate.reduce((acc, el) => {

    // console.log(typeof(el.date));
    // let d = Object.keys(acc);
    el.date === "2019/06/28" ? acc["2019/06/28"].push(el) : '';
    el.date === "2019/06/27" ? acc["2019/06/27"].push(el) : '';
    el.date === "2019/06/26" ? acc["2019/06/26"].push(el) : '';
    el.date === "2019/06/25" ? acc["2019/06/25"].push(el) : '';
    el.date === "2019/06/24" ? acc["2019/06/24"].push(el) : '';
    el.date === "2019/06/23" ? acc["2019/06/23"].push(el) : '';
    el.date === "2019/06/22" ? acc["2019/06/22"].push(el) : '';
    return acc;

  }, {"2019/06/28": [], "2019/06/27": [], "2019/06/26": [], "2019/06/25": [], "2019/06/24": [], "2019/06/23": [], "2019/06/22": []});
  console.log('acc: ', yes)
}

function addFriendsToArray(user, day, usersOnGivenDate) {
  user.friends.forEach(friendID => {
    if (friendID === day.userID) {
      usersOnGivenDate.push(day)
    }
  })
}

  // let allUsersOnGivenDateIndex = activityData.indexOf(allUsersOnGivenDate);
  // // console.log('given date Index: ', givenDateIndex)
  // // let weeklyActivityData = activityData.slice(givenDateIndex - 6, givenDateIndex + 1);
  //
  // // console.log('weekly data: ', weeklyActivityData)
  // let friends = [];
  //
  // weeklyActivityData.find(el => el.userID === 1 ? friends.push(el) : '');
  // let allFriendsStepActivity = user.friends.reduce((acc, currentFriend) => {
  //   weeklyActivityData.forEach(el => {
  //     currentFriend === el.userID ? friends.push(el) : '';
  //     let friendsUserData = userRepository.userData.find(user => el.userID === user.id);
  //     friends.forEach(friend => friendsUserData.id === friend.userID ? friend['name'] = friendsUserData.name : '');
  //   });
  //   acc['friendsActivity'] = friends;
  //   return acc;
  // }, []);
  // return allFriendsStepActivity.friendsActivity;



// function getStepCountWinner(user, userRepository) {
//   let mostSteps = 0;
//   let userFriends = getFriends(user, userRepository);
//   let winner = userFriends.reduce((acc, friend) => {
//     if (mostSteps < friend.numSteps) {
//       mostSteps = friend.numSteps;
//       acc = friend;
//     }
//     return acc;
//   }, {});
//   return winner;
// }

// function getUserFriendsWidget(user, userRepository) {
//   let userFriends = getFriends(user, userRepository);
//   let winner = getStepCountWinner(user, userRepository);
//   wrapper.insertAdjacentHTML('afterBegin', `
//     <section class='eight'>
//       <p>FRIENDS STEP COUNT FOR</p>
//       <p>THE WEEK OF: 2019/06/28</p>
//       <p class='user-data'>${userFriends[0].name}: ${userFriends[0].numSteps}</p>
//       <p class='user-data'>${userFriends[1].name}: ${userFriends[1].numSteps}</p>
//       <p class='user-data'>${userFriends[2].name}: ${userFriends[2].numSteps}</p>
//       <p class='user-data'>${userFriends[3].name}: ${userFriends[3].numSteps}</p>
//       <p>WINNER:</p>
//       <p class='user-data'>${winner.name}: ${winner.numSteps}</p>
//     </section>
//   `);
// }

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
