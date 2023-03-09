"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navAddStoryClick(evt) {
  console.log("here");
  console.debug("navAddStoryClick", evt);
  hidePageComponents();
  putStoriesOnPage();
  $addStoryForm.show();
}

$navAddStory.on("click", navAddStoryClick);

function navSubmitStoryClick(evt) {
  console.log("here");
  console.debug("navSubmitStoryClick", evt);
  $addStoryForm.hide();
}

$submitStoryForm.on("click", navSubmitStoryClick);

function navAddFavoritesClick(evt) {
  console.debug("navAddFavoritesClick", evt);
  hidePageComponents();
  putFavoritesOnPage();
  if (currentUser.favorites.length === 0) {
    $favoritePage.append("<h5>No favorites added yet!</h5>");
  }
  // const icon = $("#favorited-stories");
  // const favetoggle = icon.find("i")
  // console.log('nav', favetoggle)
  // if (favetoggle.hasClass("fa-star") && icon.hasClass("far")){
  //   return icon.display = "none";
  // }
}

$navAddFavorites.on("click", navAddFavoritesClick);

function navOwnStoriesClick(evt) {
  console.debug("navOwnStoriesClick", evt);
  hidePageComponents();
  putOwnStoriesOnPage()
  console.log(currentUser.ownStories);
  if (currentUser.ownStories.length === 0) {
    console.log("own stories");
    $ownStories.append("<h5>No stories added yet!</h5>");
  }
}

$navOwnStories.on("click", navOwnStoriesClick);