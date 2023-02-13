const input = document.querySelector("#fruit");
const suggestions = document.querySelector(".suggestions ul");

const fruit = [
  "Apple",
  "Apricot",
  "Avocado 🥑",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Blueberry",
  "Boysenberry",
  "Currant",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Cucumber",
  "Custard apple",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Gooseberry",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Guava",
  "Honeyberry",
  "Huckleberry",
  "Jabuticaba",
  "Jackfruit",
  "Jambul",
  "Juniper berry",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Longan",
  "Lychee",
  "Mango",
  "Mangosteen",
  "Marionberry",
  "Melon",
  "Cantaloupe",
  "Honeydew",
  "Watermelon",
  "Miracle fruit",
  "Mulberry",
  "Nectarine",
  "Nance",
  "Olive",
  "Orange",
  "Clementine",
  "Mandarine",
  "Tangerine",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Plantain",
  "Plum",
  "Pineapple",
  "Pomegranate",
  "Pomelo",
  "Quince",
  "Raspberry",
  "Salmonberry",
  "Rambutan",
  "Redcurrant",
  "Salak",
  "Satsuma",
  "Soursop",
  "Star fruit",
  "Strawberry",
  "Tamarillo",
  "Tamarind",
  "Yuzu",
];

function search(str) {
  // Create an empty array in which to list the matching items that will be returned.
  let results = [];

  // Convert search string to lowercase for case-insensitive comparison.
  const query = str.toLowerCase();

  // Loop through the fruit array and convert it into lowercase for comparison.
  for (let i = 0; i < fruit.length; i++) {
    const item = fruit[i].toLowerCase();
    // Add matching items to the results array.
    if (item.includes(query)) {
      results.push(fruit[i]);
    }
  }
  // Returns the results array
  return results;
}

function searchHandler(e) {
  /* Calls the search() function on the user's input value and get the 
  matching results*/
  const inputVal = e.target.value;
  const results = search(inputVal);
  // Creates list element of matching results
  showSuggestions(results);
}

function showSuggestions(results) {
  // Clear the previous suggestions from the list
  suggestions.innerHTML = "";
  // Creates a list for the matching results
  results.forEach((result) => {
    let li = document.createElement("li");
    li.innerHTML = result;
    suggestions.append(li);
  });
  /* This make sure that display is set to block not none
  due to the event listener i created on search container */
  suggestions.style.display = "block";
}

function useSuggestion(e) {
  // Sets the input value using the targeted li element text
  if (e.target.tagName.toLowerCase() === "li") {
    input.value = e.target.textContent;
  }
}

/* Hover function that changes the background color of
a target list */
function hover(event) {
  const lists = event.target;
  if (event.type === "mouseover") {
    lists.style.backgroundColor = "lightblue";
  } else if (event.type === "mouseout") {
    lists.style.backgroundColor = "";
  }
}

/* Executes an event when a user provides an input on the textbox and calls
the function searchHandler() */
input.addEventListener("input", searchHandler);

/* Executes the click event and calls the function 
useSuggestion() to put the 'clicked' list on the input box. */
suggestions.addEventListener("click", useSuggestion);

/* Calls the function hover() when going through the
suggestion list. */
suggestions.addEventListener("mouseover", hover);
suggestions.addEventListener("mouseout", hover);

/* This event handles the display when i click outside of
search container removing the suggestion list */
document.addEventListener("click", (event) => {
  if (!event.target.matches(".search-container")) {
    suggestions.style.display = "none";
  }
});
