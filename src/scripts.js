window.addEventListener('load', loadInfo);

let wrapper = document.querySelector('body');

function loadInfo() {
  getUserInfo();
  // getHydrationInfo();
}

function getUserInfo() {
  let userRepository = new UserRepository(userData);
  let user = new User(userData[0]);

  wrapper.insertAdjacentHTML('beforeend', `
  <header>
    <h1>Welcome, <span>${user.getUsersFirstName()}</span>!</h1>
  </header>
  <main>
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
  <main>
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
  let section1 = document.querySelector('one');

  section1.insertAdjacentHTML('afterend', `
    <section class='hydration-widget'>
      <p>OUNCES OF WATER TODAY:</p>
      <p class='user-data dailyHydrationSection'>${dailyHydration.numOunces} OZ</p>
      <p>OUNCES OF WATER THIS WEEK:</p>
      </section>
  `)
  let dailyHydrationSection = document.querySelector('dailyHydrationSection');

  //
  //
  // weeklyHydration.forEach(el => {
  //   dailyHydrationSection.insertAdjacentHTML('afterend',
  //   `<p class='user-data'>DATE:${el.date}</p>
  //   <p class='user-data'>OUNCES:${el.numOunces}</p>`
  //   )
  // })
}
//
