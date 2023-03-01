$(document).ready(function() {
  console.log("Page is Ready!");

  $("textarea").on("input", function(event) {
    const count = $(this).val().length;
    console.log("And what about this", $(this).val().length);

    const reverseCount = 140 - count;
    console.log("reverseCount: ", reverseCount);
  
    console.log("counter: ", $(".counter").output);
})
});