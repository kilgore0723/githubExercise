console.log("Let's get this party started!");
const token = "wXLcGvLvz2XTzt9026s0ifrtzHyoCpb9";

$(document).ready(function () {
  // Get data from the giphy API
  async function getDataFromAPI(searchGif) {
    let res = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: { q: searchGif, api_key: token },
    });
    const randomGif = Math.floor(Math.random() * res.data.data.length);
    const gifUrl = res.data.data[randomGif].images.original.url;

    const newGif = createImgElement(gifUrl);
    createNewDiv(newGif);
  }
  // Select the form and add an event listener
  $("#search-button").on("click", function (e) {
    e.preventDefault();
    const searchGif = $("#search").val();
    getDataFromAPI(searchGif);
    $("#search").val("");
  });
  // Remove gifs
  $("#remove-button").on("click", function (e) {
    e.preventDefault();
    $("#gif-container").empty();
  });
});
// Create a new image element that will be put inside the div container class="gif-container"
function createImgElement(gifUrl) {
  const newImg = $("<img>")
    .attr("src", gifUrl)
    .addClass("gif img-fluid")
    .css({ height: "200px", objectFit: "contain" });
  return newImg;
}

// Create a new div element that will contain the image
function createNewDiv(newImg) {
  const col = $("<div>").addClass("col-md-4 mt-2").append(newImg);
  $("#gif-container").append(col);
}



















// // Select the form and add an event listener
// const form = document.querySelector("#search");
// const search = document.querySelector("#search-button");
// search.addEventListener("click", function (e) {
//   e.preventDefault();
//   const searchGif = document.querySelector("#search").value;
//   getDataFromAPI(searchGif);
//   form.value = "";
// });

// // Remove gifs
// const deleteGifs = document.querySelector("#remove-button");
// deleteGifs.addEventListener("click", function (e) {
//   e.preventDefault();
//   const gifContainer = document.querySelector("#gif-container");
//   while (gifContainer.firstChild) {
//     gifContainer.removeChild(gifContainer.firstChild);
//   }
// });

// async function getDataFromAPI(searchGif) {
//   // function that will get data from the giphy API
//   const token = "wXLcGvLvz2XTzt9026s0ifrtzHyoCpb9";
//   let res = await axios.get("https://api.giphy.com/v1/gifs/search", {
//     params: { q: searchGif, api_key: token },
//   });
//   const randomGif = Math.floor(Math.random() * res.data.data.length);
//   const gifUrl = res.data.data[randomGif].images.original.url;

//   const newGif = createImgElement(gifUrl);
//   createNewDiv(newGif);
// }

// // Create a new image element that will be put inside the div container class="gif-container"
// function createImgElement(gifUrl) {
//   const newImg = document.createElement("img");
//   newImg.src = gifUrl;
//   newImg.classList.add("gif", "img-fluid");
//   newImg.style.height = "200px";
//   newImg.style.objectFit = "contain";
//   return newImg;
// }
// // Create a new div element that will contain the image
// function createNewDiv(newImg) {
//   const gifContainer = document.querySelector("#gif-container");
//   const col = document.createElement("div");
//   col.classList.add("col-md-4", "mt-2");
//   col.append(newImg);
//   gifContainer.append(col);
// }
