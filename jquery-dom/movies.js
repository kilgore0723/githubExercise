// Add a movie to the list when the form is submitted
$("#submit").on("click", function () {
  let title = $("#title").val();
  let rating = $("#rating").val();
  let $movie = $("<li></li>");
  let $remove = $("<button>x</button>")
    .css({ color: "red", marginLeft: "5px", fontSize: "0.75em" })
    .addClass("remove");
  if (title === "" || rating === "") {
    alert("Please enter a movie title and rating");
    return;
  } else if (rating < 0 || rating > 10) {
    alert("Please enter a rating between 0 and 10");
    return;
  } else if (title.length < 2) {
    alert("Please enter a movie title with at least 2 characters");
    return;
  }
  $movie.text(title + " - " + rating);
  $movie.append($remove); // Append remove button to new li element
  $("#movies").append($movie);
  $("#title").val("");
  $("#rating").val("");
});

// Add event handler to remove button
$("#movies").on("click", ".remove", function () {
  $(this).closest("li").remove();
});

//Allow users to sort alphabetically by the title of the movie or by the rating of the movie from lowest to highest and vice versa.
$("#sort-name").on("click", function () {
  let $movies = $("#movies li");
  $movies.sort(function (a, b) {
    return $(a).text().localeCompare($(b).text());
  });
  $("#movies").empty().append($movies);
});

// sort by rating : ascending
$("#sort-rateasc").on("click", function () {
  let $movies = $("#movies li");
  $movies.sort(function (a, b) {
    return $(a).text().split(" - ")[1] > $(b).text().split(" - ")[1] ? 1 : -1;
  });
  $("#movies").html($movies);
});

// sort by rating : descending
$("#sort-ratedesc").on("click", function () {
  let $movies = $("#movies li");
  $movies.sort(function (a, b) {
    return $(a).text().split(" - ")[1] < $(b).text().split(" - ")[1] ? 1 : -1;
  });
  $("#movies").html($movies);
});
