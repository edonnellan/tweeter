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
  console.log("client.js document ready?");
  
  console.log($("form"), "the form")
  $("form").submit(function(event) {
    // alert("Handler for .submit() called.");
    event.preventDefault();
    
    let formData = $(this).serialize()
    
    console.log("formData", formData)
    
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData,
      success: (tweetResponse) => {renderTweets(tweetResponse)},
      error: (err) => {}
    });
  });

  // renderTweets(data);

});

  const createTweetElement = function(data) {
    const $tweet = $("<article>").addClass("tweet");
    const html = `
          <header>
            <div class="user-icon-and-name">
              <i class="fa-solid fa-user"></i>
              <h5>${data.user.name}</h5>
            </div>
            <p>${data.user.handle}</p>
          </header>
            <p class="tweet-content">${data.content.text}</p>
          <footer>
            <span> 10 days ago</span>
            <div class="tweet-footer-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        `
        const tweetElement = $tweet.append(html);
        return tweetElement;
  }

  const renderTweets = function(tweets) {
    console.log("renderTweets: ", tweets);
    const $tweetContainer = $("#tweets-container")
    console.log($tweetContainer);
    tweets.forEach(tweet => {
     const tweetElement = createTweetElement(tweet);
     $tweetContainer.append(tweetElement);
    });

  };







