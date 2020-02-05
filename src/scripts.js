window.addEventListener('load', getUserInfo);

var wrapper = document.querySelector('body');

function getUserInfo() {
  let userRepository = new UserRepository(userData);
  let user = new User(userData[0])
  wrapper.insertAdjacentHTML('beforeend', `
  <header>
    <h1>Welcome, <span>${user.getUsersFirstName()}!</h1>
  </header>
  <main>
    <section class='one'>
      <h2 class='user-name'>${userData[0].name}</h2>
      <p>ADDRESS</p>
      <p class='user-data'>${userData[0].address}</p>
      <p>EMAIL</P>
      <p class='user-data'>${userData[0].email}</p>
      <p>STRIDE-LENGTH</p>
      <p class='user-data'>${userData[0].strideLength}</p>
      <p>DAILY STEP GOAL</p>
      <p class='user-data'>${userData[0].dailyStepGoal}</p>
      <p>FRIENDS</p>
      <p class='user-data'>${userData[15].name} | ${userData[3].name} | ${userData[7].name}</p>
    </section>
  <main>
  `);
}

//
