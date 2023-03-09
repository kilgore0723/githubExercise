"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
const buttonStyle = `<button type="button" id="delete-btn" class="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center">
<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
</svg>
Delete
</button>`;

function generateStoryMarkup(story) {
  const hostName = story.getHostName();
  const faveClass = isFavorite(story.storyId) ? "fas" : "far";
  const deleteButton =
    currentUser.username === story.username ? buttonStyle : ``;
  const $li = $(`
  <div class="container zoom-in">
    <div class="row">
      <div class="col">
        <li id="${story.storyId}">
          <span class="star">
            <i class="fa-star ${faveClass}"></i>
          </span>
          <a href="${story.url}" target="a_blank" class="story-link">
            ${story.title}
          </a>
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
          <small class="story-user">posted by ${story.username}</small>
        </li>
      </div>
      <div class="col">
          ${deleteButton}
      </div>
    </div>
  </div>
    `);

  const $star = $li.find(".star");
  $star.on("click", toggleStar);

  const $deleteButton = $li.find("#delete-btn");
  $deleteButton.on("click", deleteOwnStoriesOnPage);

  return $li;
}

function deleteOwnStoriesOnPage(e) {
  console.debug("deleteOwnStoriesOnPage");
  const $closestDiv = $(e.target).closest(".container");
  console.log("closestDiv", $closestDiv);

  const storyId = $closestDiv.find("li").attr("id");
  console.log("closestLi", storyId);
  const story = storyList.stories.find((s) => s.storyId === storyId);
  console.log("story", story)

  removeStoryFromAPI(storyId);
  
  $closestDiv.remove();
}

// create a function that removes the story from the API
async function removeStoryFromAPI(storyId) {
  console.debug("removeStoryFromAPI");

  await storyList.removeStory(currentUser, storyId);
}

// Toggle star. If star is filled in, add to favorites. If star is empty, remove from favorites.
async function toggleStar(e) {
  const $target = $(e.target);
  console.log("target", $target);
  const $star = $target.closest(".star");
  const storyId = $target.closest("li").attr("id");
  console.log("storyId", storyId)
  const story = storyList.stories.find((s) => s.storyId === storyId);
  console.log("story", story);
  const icon = $star.find("i");

  // Check if the star is now filled in
  if (icon.hasClass("fa-star") && icon.hasClass("far")) {
    await currentUser.addFavorite(story.storyId);
    icon.removeClass("far");
    icon.addClass("fas");

    // If the star is now empty, remove from favorites
  } else {
    await currentUser.removeFavorite(story.storyId);
    icon.removeClass("fas");
    icon.addClass("far");
  }
}

function isFavorite(storyId) {
  return currentUser.favorites.some((s) => s.storyId === storyId);
}

//Put favorite stories on page
function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $favoritePage.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    console.log(currentUser.favorites);
    const $story = generateStoryMarkup(story);
    $favoritePage.append($story);
  }

  $favoritePage.show();
}

function putOwnStoriesOnPage() {
  console.debug("putOwnStoriesOnPage");

  $ownStories.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.ownStories) {
    console.log(currentUser.ownStories);
    const $story = generateStoryMarkup(story);
    $ownStories.append($story);
  }

  $ownStories.show();
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// submit new story function
async function submitNewStory(e) {
  e.preventDefault();
  const title = $("#addstory-title").val();
  const author = $("#addstory-author").val();
  const url = $("#addstory-url").val();
  const newStory = { title, author, url };

  await storyList.addStory(currentUser, newStory);
  putStoriesOnPage();
  $addStoryForm.trigger("reset");
}

$submitStoryForm.on("click", submitNewStory);
