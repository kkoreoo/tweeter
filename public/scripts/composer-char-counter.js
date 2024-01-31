// waits till the DOM is ready to be manipulated 
$(document).ready(function() {

  $("#tweet-text").on("keyup", function (event) { // keypress or input?
    let charCount = Number($(".counter").html());
    // will add or subtract from the character count depending on key input
    if (event.key !== "Backspace"){
      charCount -= 1
      $(".counter").html(charCount);
    } else {
      charCount += 1;
      $(".counter").html(charCount); 
    }

    // changes counter color to red if negative 
    if (charCount < 0) {
      $(".counter").addClass("negative-counter");
    } else if (charCount >= 0) {
      $(".counter").removeClass("negative-counter");
    }
  });
});