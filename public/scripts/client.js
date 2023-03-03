/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
  console.log("client.js document is ready");

  //escaping cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Get request for tweets
  const loadTweets = function () {
    console.log("GET FORM?!?!");

    $.ajax("/tweets", {
      method: "GET",
      url: "/tweets",
      dataType: "json",
      success: function (data) {
        renderTweets(data);
      },
    });
  };

  loadTweets(); //loading existing tweets on page load

  //Tweet submission
  $("form").submit(function (event) {
    event.preventDefault();//stop page refresh

    const formData = $(this).serialize();//ensures we're getting just the form value

    let tweetText = $("#tweet-text").val();
    const $error = $(".error");
    const $errorMsg = $error.find("span");  
    
    //check if tweet is empty
    if (!tweetText) {
      $error.slideUp(1000, function () {//Make sure error msg if gone then deal with current error
        $errorMsg.text("Tweet cannot be empty!");
        $error.slideDown(1000);
      });

      return;
      //check if tweet is too long (> 140 chars)
    } else if (tweetText.length > 140) {
      $error.slideUp(1000, function () {//Make sure error msg if gone then deal with current error
        $errorMsg.text("Tweet cannot be longet than 140 characters!");
        $error.slideDown(1000);
      });

      return;

    } else { //else slide up as there is no error
      $error.slideUp(1000);
    }
    
    //post tweet request
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData,
      success: (tweetResponse) => {

        $("textarea").val(""); //clear textarea after submit
        $(".counter").text(140); //reset counter after submit

        $.get("/tweets", (tweetResponse) => {
         
          renderTweets(tweetResponse.slice(-1)); //Add newest tweet to page
        });
      }
    });
  });

  //Takes in one tweet data object and converts it to an html article to add to the page
  const createTweetElement = function (data) {
    const userData = data.user;
    const $tweet = $("<article>").addClass("tweet"); //creating the element with a class to accept dynamic tweets

    const html = `
          <header>
            <div class="user-icon-and-name">
              <i class="fa-solid fa-user"></i>
              <h5>${escape(userData.name)}</h5>
            </div>
            <p>${escape(userData.handle)}</p>
          </header>
            <p class="tweet-content">${escape(data.content.text)}</p>
          <footer>
            <span>${escape(timeago.format(data.created_at))}</span>
            <div class="tweet-footer-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        `;
    const tweetElement = $tweet.append(html); //adding the new tweet into page html
    return tweetElement;
  };


  //takes in database array of tweet objects. Uses createTweetElement to convert to html and adds the newest tweet at the top
  const renderTweets = function (tweets) {
    const $tweetContainer = $("#tweets-container");

    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $tweetContainer.prepend(tweetElement);
    }
  };
});
