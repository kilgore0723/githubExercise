const gameContainer = document.getElementById("game");

let flippedCard = false;
let lockCard = false;
let firstCard = null;
let secondCard = null;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute("data-color", color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (lockCard) return;
  if (this === firstCard) return;
  this.classList.add("flipped");

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
    console.log("First Click", firstCard.dataset.color);
    return;
  }
  flippedCard = false;
  secondCard = this;
  console.log("Second Click", secondCard.dataset.color);
  lockCard = true;

  if (firstCard.dataset.color === secondCard.dataset.color) {
    // Keep cards flipped if matched. //
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
    lockCard = false;
  } else {
    // Flip cards back if cards do not match //
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      lockCard = false;
    }, 1000);
  }
}

const newGame = document.getElementById('new-game');

newGame.addEventListener('click', function(){
    location.reload();
})

// when the DOM loads
createDivsForColors(shuffledColors);

/* */
