// waits till the DOM is ready to be manipulated 
$(document).ready(function() {

  $("#tweet-text").on("keyup", function (event) { // keypress or input?
    let tweetLength = $('#tweet-text').val().length;

    // will add or subtract from the character count depending on key input
    let charCount = (140 - tweetLength);
    $(".counter").html(charCount);

    // changes counter color to red if negative 
    if (charCount < 0) {
      $(".counter").addClass("negative-counter");
    } else if (charCount >= 0) {
      $(".counter").removeClass("negative-counter");
    }
  });

  //Display Return to Top Button
  const $returnToTop = $('.return-to-top');
  $(window).on('scroll', () => {
    // will only show button after scrolling down a little bit
    if ($(window).scrollTop() > 100) {
      $returnToTop.show();
    } else {
      $returnToTop.hide();
    }
  })

  //Return to Top
  $returnToTop.on('click', () => {
    $("html, body").animate({scrollTop: '0px'}, 300);
  });

});

