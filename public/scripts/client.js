/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

function renderTweets(data) {
  $container = $('#tweets-container')
  data.forEach(function(tweet) {
    let $tweet = createTweetElement(tweet)
    $container.prepend($tweet)
  })
}

function createTweetElement(tweet) {
  let content = tweet.content.text
  let smallAvatar = tweet.user.avatars
  let name = tweet.user.name
  let handle = tweet.user.handle
  let timestamp = timeStamp(tweet.created_at)
  let html =
    `<article class="tweet">
      <header class="tweet-header">
        <img src="${smallAvatar}">
          <h2 class="name">${name}</h2>
          <span class="handle">${handle}</span>
      </header>
        <div class="content">${content}</div>
        <footer class="tweet-footer">
          <span class="timestamp">${timestamp} Days Ago</span>
          <span class="icons">
            <i class="fa fa-flag" aria-hidden="true"></i>&nbsp
            <i class="fa fa-retweet" aria-hidden="true"></i>&nbsp
            <i class="fa fa-heart" aria-hidden="true"></i>&nbsp
        </span>
        </footer>
     </article>`
    return html
  };

 const loadTweets = function() {
  $.ajax("/tweets/", {method: "GET"})
  .then(function(data) {
    renderTweets(data);
  })
 };

 $(document).ready(function(){
  loadTweets();
  $("#tweetform").submit(function(event) {
    event.preventDefault();
    let form = $(this);
    let url = form.attr("action");
    let content = $("#tweet-text").val() 
    if (content.length === 0) {
      $("#error").text("Lack of Character");
      $("#error").slideDown();
      return
    }
    if (content.length > 140) {
      $("#error").text("Character Count Exceeded");
      $("#error").slideDown();
      return
    } 
    $.ajax({type: "POST", url: url, data: form.serialize()})
    .then(function(data) {
      console.log(data);
      location.reload();
    })
  })
});


