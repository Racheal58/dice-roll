// displaying the dot on the dice
function createDice(number) {
  const dotPositionMatrix = {
    1: [[2, 2]],
    2: [
      [1, 1],
      [3, 3],
    ],
    3: [
      [1, 1],
      [3, 3],
      [2, 2],
    ],
    4: [
      [1, 1],
      [3, 3],
      [1, 3],
      [3, 1],
    ],
    5: [
      [1, 1],
      [3, 3],
      [3, 1],
      [1, 3],
      [2, 2],
    ],
    6: [
      [1, 1],
      [3, 3],
      [1, 3],
      [3, 1],
      [1, 2],
      [3, 2],
    ],
  };

  const dice = document.createElement("div");

  dice.classList.add("dice");

  for (const dotPosition of dotPositionMatrix[number]) {
    const dot = document.createElement("div");

    dot.classList.add("dice-dot");
    dot.style.setProperty("--grid-column", dotPosition[0]);
    dot.style.setProperty("--grid-row", dotPosition[1]);
    dice.appendChild(dot);
  }

  return dice;
}

// get random not when the dice is rolled
function randomizeDice(diceContainer, numberOfDice) {
  diceContainer.innerHTML = "";

  for (let i = 0; i < numberOfDice; i++) {
    const random = Math.floor(Math.random() * 6 + 1);
    const dice = createDice(random);

    diceContainer.appendChild(dice);
  }
}

const NUMBER_OF_DICE = 2;
const diceContainer = document.querySelector(".dice-container");
const btnRollDice = document.querySelector(".btn-roll-dice");

randomizeDice(diceContainer, NUMBER_OF_DICE);

btnRollDice.addEventListener("click", () => {
  const interval = setInterval(() => {
    randomizeDice(diceContainer, NUMBER_OF_DICE);
  }, 50);

  setTimeout(() => clearInterval(interval), 1000);

  fetchActivity();
});

const activityDiv = document.getElementById("activity-container");
const loader = document.getElementById("loading");
const resetButton = document.querySelector(".btn-reset");
const errMsg = document.querySelector(".err-msg");

function showLoader() {
  loader.classList.add("display");

  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}

function hideLoader() {
  loader.classList.remove("display");
}

// Reset data
function resetData() {
  activityDiv.innerHTML = ""; // Clear the content of the data container
  errMsg.innerHTML = ""; // Clear error message
}

// Event listener for the reset button
resetButton.addEventListener("click", resetData);

function displayActivity(data) {
  const activity = data;

  //TODO: optimized code: checked, implement loading state :checked, clear list: checked show the result of the rolled dice

  const activityDiv = document.getElementById("activity-container");

  function createAndAppendLi(parentElement, text) {
    const li = document.createElement("li");
    li.innerHTML = text;
    parentElement.appendChild(li);
  }

  createAndAppendLi(
    activityDiv,
    `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-strava" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M15 13l-5 -10l-5 10m6 0l4 8l4 -8" />
  </svg>: ${activity.activity}`
  );
  createAndAppendLi(
    activityDiv,
    `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-letter-t-small" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M10 8h4" />
    <path d="M12 8v8" />
  </svg>: ${activity.type}`
  );
  createAndAppendLi(
    activityDiv,
    `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-tags" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 8v4.172a2 2 0 0 0 .586 1.414l5.71 5.71a2.41 2.41 0 0 0 3.408 0l3.592 -3.592a2.41 2.41 0 0 0 0 -3.408l-5.71 -5.71a2 2 0 0 0 -1.414 -.586h-4.172a2 2 0 0 0 -2 2z" />
    <path d="M18 19l1.592 -1.592a4.82 4.82 0 0 0 0 -6.816l-4.592 -4.592" />
    <path d="M7 10h-.01" />
  </svg>: ${activity.price}`
  );
}

function fetchActivity() {
  // show loader
  showLoader();

  // API endpoint for user data
  const apiUrl = "http://www.boredapi.com/api/activity/";

  // Make a GET request using the Fetch API
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // remove loader
      hideLoader();
      // Process the retrieved user data
      displayActivity(data);
    })
    .catch((error) => {
      errMsg.innerHTML = error.message;
    });
}
