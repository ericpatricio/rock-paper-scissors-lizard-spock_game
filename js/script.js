const choices = [
  {
    name: "scissors",
    beats: ["paper", "lizard"],
  },
  {
    name: "paper",
    beats: ["rock", "spock"],
  },
  {
    name: "rock",
    beats: ["lizard", "scissors"],
  },
  {
    name: "lizard",
    beats: ["spock", "paper"],
  },
  {
    name: "spock",
    beats: ["scissors", "rock"],
  },
];
// // DOM Variables
const modal = document.querySelector(".modal");
const rulesBtn = document.querySelector(".rules");
const rulesDesktopBtn = document.querySelector(".rules-desktop");
const closeBtn = document.querySelectorAll(".close-btn");
const game = document.querySelector(".game");
const choiceBtns = document.querySelectorAll(".choice-button");
const playersChoice = document.querySelectorAll(".players-choice");
const playersDOM = document.querySelectorAll(".player");
const resultsDOM = document.querySelector(".results");
const mobileResult = document.querySelector(".mobile-result-text");
const desktopResult = document.querySelector(".desktop-result-text");
const resultTitle = document.querySelectorAll(".result-title");
const playAgainBtn = document.querySelectorAll(".play-again");
const score = document.querySelector(".score-number");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
// Score
let scoreNumber = 0;
// Add event listener to each choice button
choiceBtns.forEach(button => {
  button.addEventListener("click", () => {
    // Grab the name id
    const nameBtn = button.dataset.id;
    // From the choices array find the choice picked by the user
    const userPicked = choices.find(choice => choice.name === nameBtn);
    // Call startGame function with the user choice
    startGame(userPicked);
  });
});
// The startGame function is responsible for initiating the game by calling the showResults and showWinner functions with the user's choice and a randomly generated computer choice. It catches any errors that may occur during the game.
function startGame(userPicked) {
  try {
    // Call randomPicked function and save it into computerPicked varialble
    const computerPicked = randomPicked();
    showResults([userPicked, computerPicked]);
    showWinner([userPicked, computerPicked]);
  } catch (error) {
    alert("An error ocurred. Please try again later");
  }
}
// showResults function will display the choices made by the user and the computer in the game, and to toggle the visibility of the game and results sections.
function showResults(results) {
  playersDOM.forEach((choice, index) => {
    setTimeout(() => {
      choice.innerHTML = `
      <div class="choice ${results[index].name}">
        <img src="images/icon-${results[index].name}.svg" alt="${
        results[index].name
      }" />
      </div>
      <h2 class="choice-text">${
        index === 0 ? "You Picked" : "The House Picked"
      }</h2>           
    `;
    }, index * 1000);
    game.classList.add("hidden");
    resultsDOM.classList.remove("hidden");
  });
}
// showWinner function will determine the winner of the game based on the choices made by the user and the computer, update the score, and display the result on the screen.
function showWinner(results) {
  const userBeats = results[0].beats;
  const userName = results[0].name;
  const computerBeats = results[1].beats;
  const computerName = results[1].name;
  const userWin = userBeats.includes(computerName);
  const computerWin = computerBeats.includes(userName);
  setTimeout(() => {
    mobileResult.classList.toggle("hidden");
    desktopResult.classList.toggle("hidden");
    if (userWin) {
      resultTitle.forEach(title => (title.textContent = "you win"));
      playersDOM[0].classList.toggle("winner");
      scoreNumber++;
      score.textContent = scoreNumber;
    } else if (computerWin) {
      resultTitle.forEach(title => (title.textContent = "you lose"));
      playersDOM[1].classList.toggle("winner");
      scoreNumber--;
      score.textContent = scoreNumber;
    } else {
      resultTitle.forEach(title => (title.textContent = "It's a draw"));
    }
  }, 1500);
}
// randomPicked function will randomly select a choice from the choices array.
function randomPicked() {
  const random = Math.floor(Math.random() * choices.length);
  return choices[random];
}
// Event listener
playAgainBtn.forEach(againBtn => {
  againBtn.addEventListener("click", () => {
    game.classList.toggle("hidden");
    resultsDOM.classList.toggle("hidden");
    mobileResult.classList.toggle("hidden");
    desktopResult.classList.toggle("hidden");
    playersDOM[0].classList.remove("winner");
    playersDOM[1].classList.remove("winner");

    playersDOM.forEach(choice => {
      choice.innerHTML = "";
    });
  });
});
rulesBtn.addEventListener("click", () => {
  console.log("Clicked");
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});
rulesDesktopBtn.addEventListener("click", () => {
  console.log("Clicked");
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});
closeBtn.forEach(button => {
  button.addEventListener("click", () => {
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  });
});
