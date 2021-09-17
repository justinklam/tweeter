$(document).ready(function () {

  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://img.icons8.com/nolan/30/fox.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://img.icons8.com/nolan/30/black-jaguar.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const $tweet = $(`<article class="tweet">Hello world</article>`);

  const renderTweets = function(dataTweet) {
    // loop through argument passed into this function
    for (const tweetDetails of dataTweet) {
      // create a variable to store output of createTweetElement with this function's argument
      const tweetData = createTweetElement(tweetDetails)
      // append to .other-tweets section with what was created in tweetData
      $(".other-tweets").append(tweetData); 
    }
  };
  
  const createTweetElement = function(tweet) {
    // timeAgo function using data pulled from the database containing an array of objects
    const timeStamp = timeago.format(tweet.created_at);

    return `
    <article class="other-tweet">
      <header class="other-tweet-header">
        <img src=${tweet.user.avatars}/>
        <div class="user-name"><b>${tweet.user.name}</b></div>
        <div class="tweeter-handle">${tweet.user.handle}</div>
      </header>

    <div class="other-tweet-body">
      ${tweet.content.text}
    </div>

    <footer class="other-tweet-footer"><b>${timeStamp}</b>
      <div class="message-icon">
        <i id="icon-flag" class="fas fa-flag"></i>
        <i id="icon-retweet" class="fas fa-retweet"></i>
        <i id="icon-heart" class="fas fa-heart"></i>
      </div>
    </footer>
    </article>
    `
  };

  renderTweets(data);
});

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */