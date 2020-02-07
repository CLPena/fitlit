window.addEventListener('load', getUserInfo);

// need to go through hydration data, create a new hydration obj using each entry, and push all objects to user.hydrationToDate array

function getUserInfo() {
  let userRepository = new UserRepository(userData);
  let user = new User(userData[0]);
  let userHydrationData = hydrationData.filter(el => el.userID === user.id);
  let userHydrationDataObjs = userHydrationData.map(el => {
    return new Hydration(el.userID, el.date, el.numOunces)
  });
  user.hydrationToDate.push(userHydrationDataObjs);
  let dailyHydration = userHydrationDataObjs.find(hydration => hydration.date === "2019/06/22");
  // let test = dailyHydration.findWeeklyHydration(user, "2019/06/22");
  // console.log(test);

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
    <section class='hydration-widget'>
      <p>OUNCES OF WATER TODAY:</p>
      <p class='user-data'> </p>
      <p>OUNCES OF WATER THIS WEEK:</p>
      <p class='user-data'> </p>
    </section>
  <main>
  `);
}

let wrapper = document.querySelector('body');
//
