/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function renderTweets(data) {
  $container = $('#tweets-container')
  data.forEach(function(tweet) {
    let $tweet = createTweetElement(tweet)
    $container.prepend($tweet)
  })
}

function timeStamp(data) {
let curTime = new Date();
let pastTime = new Date(data);
return curTime.getDate() - pastTime.getDate();
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
        $("#error").text("NO CHARACTERS BUDDY");
        $("#error").slideDown();
        return
      }
      if (content.length > 140) {
        $("#error").text("TOO MANY CHARACTERS BUDDY");
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