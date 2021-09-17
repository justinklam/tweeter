$(document).ready(function () {

  const $tweet = $(`<article class="tweet">Hello world</article>`);

  const renderTweets = function(dataTweet) {
    // loop through argument passed into this function
    for (const tweetDetails of dataTweet) {
      // create a variable to store output of createTweetElement with this function's argument
      const tweetData = createTweetElement(tweetDetails)
      // append to .other-tweets section with what was created in tweetData
      $(".other-tweets").prepend(tweetData); 
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

  const loadTweets = function() {
    // ajax, looking at url: '/tweets with get method
    $.ajax({url: '/tweets', method: 'GET' })
    // result = results, passing into renderTweets(result)
    .then(result => renderTweets(result))
    // if error, console.log error
    .catch(error => console.log(`Error: `, error))
  };

  const errorHandler = function(err) {
    if (err === "empty") {
      $('.alert-message').append('<p>Please enter a message!</p>')
    }

    if (err === 'maxChar') {
      $('.alert-message').append('<p>Message is too long! 140 Character limit!</p>')
    }
  };

  const submitHandler = function(event) {
    event.preventDefault();
    let string = $('#text-box').val();
    const data = $( this ).serialize();
    if (string.length > 140) {
      errorHandler('maxChar')
    } else if (string.length === 0) {
      errorHandler('empty')
    } else {
      postTweet(data)
    }
  };

  const postTweet = function(newTweetPost) {
    $.ajax({url: '/tweets', method: 'POST', data: newTweetPost})
    .then($('.other-tweets').empty(), loadTweets())
  };

  $('form').on('submit', submitHandler);

  loadTweets();
});