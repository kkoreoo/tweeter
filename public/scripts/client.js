/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //Timeago library to indicate how long ago the tweet was posted
  jQuery("time.timeago").timeago();

  //jQuery object of form element to submit tweet
  const $tweetData = $('#post-tweet');

  //Toggles tweet form
  const $toggleTweetForm = $('.toggle-form');
    $toggleTweetForm.on('click', () => {

    if ($('.new-tweet').css("display") == 'none') {
      $('.new-tweet').slideDown('slow');
    } else {
      $('.new-tweet').slideUp('slow');
    }
  }); 


  //Escape function to protect against XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Renders tweets onto website
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (const data of tweets) {
      let $tweet = createTweetElement(data);
      $('#tweets-container').prepend($tweet);
    } 
  };
  
  // Creates HTML structure for Tweet
  const createTweetElement = function (tweetData) {
    // tweet data
    const name = tweetData.user.name;
    const avatar = tweetData.user.avatars;
    const handle = tweetData.user.handle;
    const text = tweetData.content.text;
    const dateCreated = tweetData.created_at;
  
    let $tweet = `
      <article class="tweets" id="tweets-container">
        <header>
          <div class="user-id">
            <span><img src="${avatar}"></span>
            <p>${name}</p>
          </div>
          <span class="username">${handle}</span>
        </header>
        
        <p>${escape(text)}</p>
        
        <footer>
          <time class="timeago" datetime="${dateCreated}">${jQuery.timeago(dateCreated)}</time>
          <span>
            <i class="fa-solid fa-flag"></i> 
            <i class="fa-solid fa-retweet"></i> 
            <i class="fa-solid fa-heart"></i>
          </span>
        </footer>
      </article>`
  
    return $tweet;
  };
  
  // POST request sent to server when user submits a tweet
  $tweetData.on("submit", function(event) {
    event.preventDefault();

    const data = $tweetData.serialize();
    const $tweetLength = $('#tweet-text').val().length

    if ($tweetLength === 0) {
      const emptyForm = 'Soz, you need words in your tweet. Try putting some chars in. #kthxbye'
      $(".error-message").html(emptyForm);
      $('#invalid-input').slideDown("fast");

    } else if ($tweetLength > 140) {
      const overMaxChars = 'Too Long. Plz rspct our arbitrary limit of 140 chars. #kthxbye'
      $('.error-message').html(overMaxChars);
      $('#invalid-input').slideDown("fast");

    } else {
      $.ajax({
        url: "/tweets",
        type: "POST",
        data,
        success: () => {
          $('#invalid-input').slideUp("fast");
          loadTweets();
        }, 
      })
    }
  });

  // GET request to retrieve tweets stored in DB
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      type: "GET",
      success: (tweets) => {
        renderTweets(tweets);
      }
    })
  };

  loadTweets();

});


