/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const timeStamp = timeago.format(1631482946098);
document.getElementById("other-tweet-footer").innerHTML = timeStamp;

const testTweet = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1631482946098
};

// $(document).ready(function() {
//   console.log(`hello-----`)
//   $.getJSON( "../server/data-files/initial-tweets.json", function( data ) {
//     // $.getJSON( "./scripts/1.json", function( data ) {

//   console.log('data ------', data)
//   }

// )});