/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
  console.log("client.js document is ready");

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

  loadTweets();

  // console.log($("form"), "the form")
  $("form").submit(function (event) {
    // alert("Handler for .submit() called.");
    event.preventDefault();

    const formData = $(this).serialize();

    console.log("formData", formData);

    let tweetText = $("#tweet-text").val();
    const $error = $(".error");
    console.log("error", $error);
    

    if (!tweetText) {
      $error.find("span").val("Tweet cannot be empty!");
      console.log("$error.find('span')", $error.find("span"), $error.find("span").innerHTML);

      $error.slideDown(1000);
      return;
    }

    if (tweetText.length > 140) {
      // alert("NAH!");
      // longTweet.val("<i class='fa-solid fa-triangle-exclamation'>  Tweet cannot be empty!  <i class='fa-solid fa-triangle-exclamation'>");
      // console.log("longTweet: ", longTweet);

      longTweet.slideDown(1000, function () {
        $(".error").innerHTML =
          "Tweet is too long. Keep it under 140 characters!";
          return;
        });
    }

    $("p.error").slideUp(1000, function () {
    });

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData,
      success: (tweetResponse) => {
        // const  clearForm = $("#clear-text-area").val();
        $("textarea").val("");
        $(".counter").text(140);
        console.log("tweetResponse", tweetResponse);
        // loadTweets();
        $.get("/tweets", (tweetResponse) => {
          // console.log("tweetRes: ", tweetResponse);
          // console.log("latestTweet: ", tweetResponse.slice(-1));
          renderTweets(tweetResponse.slice(-1));
        });
      },
      error: (err) => {
        console.log(err, "Error loading tweets!");
      },
    });
  });

  const createTweetElement = function (data) {
    console.log("dataCreated: ", timeago.format(data.created_at));
    const $tweet = $("<article>").addClass("tweet");
    const html = `
          <header>
            <div class="user-icon-and-name">
              <i class="fa-solid fa-user"></i>
              <h5>${escape(data.user.name)}</h5>
            </div>
            <p>${escape(data.user.handle)}</p>
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
    const tweetElement = $tweet.append(html);
    return tweetElement;
  };

  const renderTweets = function (tweets) {
    console.log("renderTweets: ", tweets);
    const $tweetContainer = $("#tweets-container");
    // console.log($tweetContainer);
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $tweetContainer.prepend(tweetElement);
    }
  };
});
