// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
const table = document.getElementById("main-table");

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;

async function getCategoryIds() {
  const totalCategories = 23000;
  const randomOffset = Math.floor(Math.random() * totalCategories);
  const url = `http://jservice.io/api/categories?count=100&offset=${randomOffset}`;
  const response = await axios.get(url);
  const data = response.data;

  const ids = data.map((category) => category.id);
  const randomIds = [];

  for (let i = 0; i < NUM_CATEGORIES; i++) {
    const randomIndex = Math.floor(Math.random() * ids.length);
    randomIds.push(ids[randomIndex]);
    ids.splice(randomIndex, 1);
  }
  console.log(randomIds);
  return randomIds;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  const url = `http://jservice.io/api/category?id=${catId}`;
  const response = await axios.get(url);
  const data = response.data;

  // i thought at first the async and await wasnt functioning properly or the api has a problem but when i start console
  // logging the data i see that the data is coming back with 0 clues. so i added this if statement to check if the data
  // has less than 5 clues and if it does then it will call the function recursively with the next category id.
  if (data.clues_count < 5) {
    console.log(`Category ${catId} has fewer than 5 clues`);
    return getCategory(catId + 1);
  }

  const clues = data.clues;
  clues.sort(() => Math.random() - 0.5);
  const selectedCategories = clues.slice(0, 5);

  if (data.clues.some((clue) => clue.question === "=")) {
    console.log("question is invalid", data.id);
    return getCategory(data.id + 1);
  } else if (data.clues.some((clue) => clue.answer === "href")) {
    console.log("answer is invalid", clues.answer, data.id);
    return getCategory(data.id + 1);
  } else {
    data.clues.forEach((clue) => {
      if (clue.answer.includes("<i>")) {
        console.log("has <i> tag", clue.answer, data.id);
        clue.answer = clue.answer.replace(/<\/?i>/g, "");
      }
    });
  }

  const cluesToUse = selectedCategories.map((clue) => ({
    question: clue.question,
    answer: clue.answer,
    showing: null,
  }));
  console.log(cluesToUse);
  return { title: data.title, clues: cluesToUse };
}

/** Fill the HTML table #jeopardy with the categories & cells for questions. */
async function fillTable() {
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  const body = document.createElement("tbody");
  head.classList.add("justify-content-center");

  categories.forEach((category) => {
    const headCell = document.createElement("td");
    headCell.textContent = category.title;
    headRow.appendChild(headCell);
  });
  head.appendChild(headRow);

  for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
    const row = document.createElement("tr");
    categories.forEach((category) => {
      console.log(category, i);
      const questionTr = handleClick(category, i);
      row.appendChild(questionTr);
    });
    body.appendChild(row);
  }

  table.appendChild(head);
  table.appendChild(body);
}

/* Handle clicking on a clue: show the question or answer. */
function handleClick(category, index) {
  const questionTd = document.createElement("td");
  questionTd.textContent = "?";

  questionTd.addEventListener("click", (event) => {
    const cell = event.target;
// Display question when user clicks on cell with "?". If question is already showing, display answer when clicked.
    if (cell.textContent === "?") {
      category.clues[index].showing = "question";
      cell.textContent = category.clues[index].question;
      cell.style.backgroundColor = "";
      console.log(category.clues[index].showing);
    } else if (cell.textContent === category.clues[index].question) {
      category.clues[index].showing = "answer";
      cell.textContent = category.clues[index].answer;
      cell.style.backgroundColor = "green";
      console.log(category.clues[index].showing);
// If answer is showing, hide it when clicked and return showing value to null.
    } else {
      category.clues[index].showing = null;
      cell.textContent = "?";
      cell.style.backgroundColor = "";
      console.log(category.clues[index].showing);
    }
  });

  return questionTd;
}

const startButton = document.querySelector("#start");
const spinner = document.querySelector("#spin-container");

startButton.addEventListener("click", () => {
  // Show the spinner and the "Loading..." text when the game is loading
  loading.classList.remove("d-none");
  spinner.classList.remove("d-none");

  // Start the game
  setupAndStart().then(() => {
    // Hide the spinner and the "Loading..." text when the game is done
    spinner.classList.add("d-none");
    loading.classList.add("d-none");
  });
});

async function setupAndStart() {
  // Make sure that the categories are fullfilled before moving on
  const ids = await getCategoryIds();
  categories = await Promise.all(ids.map(getCategory));
  //   console.log("cat", categories);
  //   console.log("ids", ids);

// If the table already exists, remove it and start a new game
  if (document.querySelector("td")) {
    createDialog();
  } else {
    table.innerHTML = "";
    fillTable();
  }
}

function createDialog() {
  const overlay = createOverlay();
  const dialogBox = createDialogBox();
  const message = createMessage();
  const subMessage = createSubMessage();
  const cancelButton = createCancelButton();
  const continueButton = createContinueButton();

  message.appendChild(subMessage);
  dialogBox.appendChild(message);
  dialogBox.appendChild(cancelButton);
  dialogBox.appendChild(continueButton);
  overlay.appendChild(dialogBox);
  document.body.appendChild(overlay);

  cancelButton.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  continueButton.addEventListener("click", () => {
    // Handle starting a new game
    table.innerHTML = "";

    fillTable();
    // Remove the dialog box
    document.body.removeChild(overlay);
  });
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  return overlay;
}

function createDialogBox() {
  const dialogBox = document.createElement("div");
  dialogBox.classList.add("dialog-box");
  return dialogBox;
}

function createMessage() {
  const message = document.createElement("h4");
  message.innerText = "Are you sure you want to start a new game?";
  return message;
}

function createSubMessage() {
  const subMessage = document.createElement("span");
  subMessage.innerText = "All progress will be lost.";
  subMessage.style.display = "block";
  return subMessage;
}

function createCancelButton() {
  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.classList.add("cancel");
  return cancelButton;
}

function createContinueButton() {
  const continueButton = document.createElement("button");
  continueButton.innerText = "Continue";
  continueButton.classList.add("continue");
  return continueButton;
}
