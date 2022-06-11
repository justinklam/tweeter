$(document).ready(function() {

  // Function that loads createTweetElement with the data needed to render
  const renderTweets = function(dataTweet) {
    // loop through dataTweet argument passed into this function
    for (const tweetDetails of dataTweet) {
      // create a variable to store output of createTweetElement with this function's argument
      const tweetData = createTweetElement(tweetDetails);
      // prepend the tweetData variable to .other-tweets section on the page
      $('.other-tweets').prepend(tweetData);
    }
  };

  const escape = function(str) {
    let span = document.createElement('span');
    span.appendChild(document.createTextNode(str));
    return span.innerHTML;
  };
  
  // Function that loads the HTML file with new Tweet data from renderTweets
  const createTweetElement = function(tweet) {    
    // timeAgo function using data pulled from the database consisting of an array of objects
    const timeStamp = timeago.format(tweet.created_at);

    return `
    <article class="other-tweet">
      <header class="other-tweet-header">
        <img src=${tweet.user.avatars}/>
        <div class="tweeter-handle">${tweet.user.handle}</div>
        <div class="user-name"><b>${tweet.user.name}</b></div>
      </header>

      <body class="other-tweet-body">
        ${escape(tweet.content.text)}
      </body>

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
  // header class can be removed on line 27

  // Function to render tweets on successful GET request
  const loadTweets = function() {
    // ajax, looking at url: '/tweets with get method
    // http get request to server at /tweets
    $.ajax({url: '/tweets', method: 'GET' })
    // result = passing results into renderTweets(result)
      .then(result => renderTweets(result))
      .catch(error => console.log(`Error: `, error));
  };

  // Function to handle error messages
  const errorHandler = function(err) {
    if (err === 'maxChar') {
      $('.alert-message').empty().append('<p><i class="fas fa-exclamation-triangle"></i> Your message is too long! 140 Character limit!</p>');
      $('.alert-message').hide().slideDown('slow');
    }

    if (err === 'empty') {
      $('.alert-message').empty().append('<p><i class="fas fa-exclamation-triangle"></i> Please enter a message!</p>');
      $('.alert-message').hide().slideDown('slow');
    }
  };

  // Function to take .JSON data from /tweets to pass
  const postTweet = function(newTweetPost) {
    $.ajax({url: '/tweets', method: 'POST', data: newTweetPost})
      .then(() => {
        // set .other-tweets to empty to prevent duplicate messages
        $('.other-tweets').empty();
        // set #text-box to empty on successful submission
        $('#text-box').val('');
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

  // Get #scroll-button to display
  mybutton = document.getElementById("scroll-button");

  // Button will show after 20px scroll down from top
  window.onscroll = function() {
    scrollFunction();
  };

  // Function to show/hide scroll-button depending on scroll position
  const scrollFunction = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  };

  // Function to give #scroll-button area to return to on use
  const topArea = function() {
    // For Safari
    document.body.scrollTop = 0;
    // For Chrome, Firefox, IE and Opera
    document.documentElement.scrollTop = 0;
  };

  // On click event listener for scroll-button
  $('#scroll-button').on('click', () => {
    topArea();
  });

  $('form').on('submit', submitHandler);

  // On click event listener to display/hide new-tweet
  $('#nav-button').on('click', () => {
    if ($('#new-tweet-id').hasClass('hidden-tweet')) {
      $('#new-tweet-id').slideDown('slow', function() {
        $(this).css('display', 'flex');
        $(this).removeClass('hidden-tweet');
        $('.alert-message').empty();
      });
    } else {
      $('#new-tweet-id').slideUp('slow', function() {
        $(this).addClass('hidden-tweet');
        $('.alert-message').empty();
      });
    }
  });
  
  // #text-box event listener to remove alert-message when typing
  $('#text-box').on('keyup', () => {
    $('.alert-message').slideUp('slow');
  });
  
  loadTweets();
});