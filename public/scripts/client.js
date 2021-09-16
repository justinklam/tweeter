/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
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
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const $tweet = $(`<article class="tweet">Hello world</article>`);

  const renderTweets = function(tweets) {
    let tweetMarkup
    for (let tweet of tweets) {
      
    }
    $('section.other-tweets').html(tweetMarkup)
  }
  
  const createTweetElement = function (tweet) {
    return `<article class="tweet">${tweet.content.text}</article>
    `
    

  };

  renderTweets(data);
  
  // const $tweet = createTweetElement(data);
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $(".container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});

// TIME AGO
const timeStamp = timeago.format(1631482946098);
document.getElementById("other-tweet-footer").innerHTML = timeStamp;

// const testTweet = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1631482946098
// };

$(document).ready(function() {
  console.log(`hello-----`)
  $.getJSON( "../server/data-files/initial-tweets.json", function( data ) {
    // $.getJSON( "./scripts/1.json", function( data ) {

  console.log('data ------', data)
  }

// )});
