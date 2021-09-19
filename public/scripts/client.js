$(document).ready(function() {

  const renderTweets = function(dataTweet) {
    // loop through argument passed into this function
    for (const tweetDetails of dataTweet) {
      // create a variable to store output of createTweetElement with this function's argument
      const tweetData = createTweetElement(tweetDetails);
      // append to .other-tweets section with what was created in tweetData
      $(".other-tweets").prepend(tweetData);
    }
  };

  const escape = function (str) {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(str));
    return span.innerHTML;
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
    ${escape(tweet.content.text)}
    </div>
    <footer class="other-tweet-footer"><b>${timeStamp}</b>
      <div class="message-icon">
        <i id="icon-flag" class="fas fa-flag"></i>
        <i id="icon-retweet" class="fas fa-retweet"></i>
        <i id="icon-heart" class="fas fa-heart"></i>
      </div>
    </footer>
    </article>
    `;
  };

  // Function to render tweets
  const loadTweets = function() {
    // ajax, looking at url: '/tweets with get method
    $.ajax({url: '/tweets', method: 'GET' })
    // result = results, passing into renderTweets(result)
      .then(result => renderTweets(result))
    // if error, console.log error
      .catch(error => console.log(`Error: `, error));
  };

  // Function to handle error messages
  const errorHandler = function(err) {
    if (err === 'maxChar') {
      $('.alert-message').empty().append('<p><img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/30/000000/external-warning-construction-and-tools-kiranshastry-gradient-kiranshastry.png"/> ERROR: Message is too long! 140 Character limit!</p>');
      $('.alert-message').slideDown();
    }

    if (err === 'empty') {
      $('.alert-message').empty().append('<p><img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/30/000000/external-warning-construction-and-tools-kiranshastry-gradient-kiranshastry.png"/> ERROR: Please enter a message!</p>');
      $('.alert-message').slideDown();
    }
  };

  // Function to take .JSON data from /tweets to pass
  const postTweet = function(newTweetPost) {
    $.ajax({url: '/tweets', method: 'POST', data: newTweetPost})
    .then(() => {
      // set .other-tweets to empty to prevent duplicate messages
      $('.other-tweets').empty();
      // set #text-box to empty on successful submission
      $('#text-box').val("");
      // remove .alert-message if it existed
      $('.alert-message').empty();
      // set #counter value back up to 140
      $('#counter').first().val(140);
      loadTweets();
    });
  };

  // Handler to take care of Submit (Tweet) button functionality
  const submitHandler = function(event) {
    event.preventDefault();
    let textBoxInput = $('#text-box').val();
    const data = $(this).serialize();

    if (textBoxInput.length > 140) {
      errorHandler('maxChar');
    } else if (textBoxInput.length === 0) {
      errorHandler('empty');
    } else {
      postTweet(data);
    }
  };

  $('form').on('submit', submitHandler);
  $('#text-box').on('keyup', () => {
    $('.alert-message').slideUp("slow");
  })
  loadTweets();
});