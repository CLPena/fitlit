window.addEventListener('load', loadInfo);

let wrapper = document.querySelector('main');
let body = document.querySelector('body');

function loadInfo() {
  getUserInfo();
  // getHydrationInfo();
}

function getUserInfo() {
  let userRepository = new UserRepository(userData);
  let user = new User(userData[0]);
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
  getHydrationInfo(user);
}

function getHydrationInfo(user){
  let userHydrationData = hydrationData.filter(el => el.userID === user.id);
  let userHydrationDataObjs = userHydrationData.map(el => {
    return new Hydration(el.userID, el.date, el.numOunces)
  });
  user.hydrationToDate = user.hydrationToDate.concat(userHydrationDataObjs);
  let dailyHydration = user.hydrationToDate.find(el => el.date === "2019/06/28");
  let weeklyHydration = dailyHydration.findWeeklyHydration(user, "2019/06/28");
  createHydrationWidget(user, dailyHydration, weeklyHydration);
}

function createHydrationWidget(user, dailyHydration, weeklyHydration){
  wrapper.insertAdjacentHTML('beforeEnd',
    `<section class='two'>
      <p class='ounces-of-water-today'>OUNCES OF WATER TODAY:</p>
      <p class='ounces-of-water-today'>${dailyHydration.numOunces} OZ</p>
    </section>`
  )

  wrapper.insertAdjacentHTML('beforeEnd',
    `<section class='three'>
      <p>OUNCES OF WATER PAST 7 DAYS:</p>
      <div class='weekly-water'>
        <p>DATE: ${weeklyHydration[0].date}<p>
        <p>${weeklyHydration[0].numOunces} OZ<p>
      </div>
      <div class='weekly-water'>
        <p>DATE: ${weeklyHydration[1].date}<p>
        <p>${weeklyHydration[1].numOunces} OZ<p>
      </div>
      <div class='weekly-water'>
        <p>DATE: ${weeklyHydration[2].date}<p>
        <p>${weeklyHydration[2].numOunces} OZ<p>
      </div>
      <div class='weekly-water'>
        <p class='water'>DATE: ${weeklyHydration[3].date}<p>
        <p class='water'>${weeklyHydration[3].numOunces} OZ<p>
      </div>
      <div class='weekly-water'>
        <p class='water'>DATE: ${weeklyHydration[4].date}<p>
        <p class='water'>${weeklyHydration[4].numOunces} OZ<p>
      </div>
      <div class='weekly-water'>
        <p class='water'>DATE: ${weeklyHydration[5].date}<p>
        <p class='water'>${weeklyHydration[5].numOunces} OZ<p>
      </div>
      <div class='weekly-water'>
        <p class='water'>DATE: ${weeklyHydration[6].date}<p>
        <p class='water'>${weeklyHydration[6].numOunces} OZ<p>
      </div>
      </section>`
  )
// function createCards(user, dailyHydration, weeklyHydration){
//   weeklyHydration.forEach(el => {
//     let date = el.date;
//     let ounces = el.numOunces;
//     wrapper.insertAdjacentHTML('beforeEnd',
//       `<div class='weekly-water'>
//         <p class='water'>DATE: ${date}<p>
//         <p class='water'>${ounces} OZ<p>
//       </div>`
//       )
//     }
//   )
//   return "";
// }

}
