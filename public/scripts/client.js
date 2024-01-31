/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
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
  ];
  
  const renderTweets = function(tweets) {
    for (const data of tweets) {
      let tweet = createTweetElement(data);
      $('#tweets-container').append(tweet);
    } 
  };
  
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
        
        <p>${text}</p>
        
        <footer>
          <span>${dateCreated}</span>
          <span>
            <i class="fa-solid fa-flag"></i> 
            <i class="fa-solid fa-retweet"></i> 
            <i class="fa-solid fa-heart"></i>
          </span>
        </footer>
      </article>`
  
    return $tweet;
  };
  
  renderTweets(data);
});


