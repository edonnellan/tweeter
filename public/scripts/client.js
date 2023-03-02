/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

$(document).ready(function() {
  console.log("tweetREADY?: ")
  const createTweetElement = function(data) {

    const $tweet = `
    <article class="tweet">
          <header>
            <div class="user-icon-and-name">
              <i class="fa-solid fa-user"></i>
              <h5>${data.user.name}</h5>
            </div>
            <p>${data.user.handle}</p>
          </header>
            <p class="tweet-content">${data.content.text}</p>
          <footer>
            <span>${data.created_at} days ago</span>
            <div class="tweet-footer-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
        `
        return $tweet;
  }
  const $tweet = createTweetElement(tweetData);
  // Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  // return $tweet;
});






