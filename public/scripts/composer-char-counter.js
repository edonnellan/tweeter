$(document).ready(function () {
  console.log("Page is Ready!");

  //Event listener && logic for tweet character counter
  $("textarea").on("input", function (event) {
    const count = $(this).val().length;

    const reverseCount = 140 - count;

    //finding the counter within the DOM
    const textAreaParents = $(this).parents().find("output");

    //reversing the count
    $(textAreaParents).val(reverseCount);

    //logic for colour if positive or negative number
    if ($(textAreaParents).val() < 0) {
      $(textAreaParents).css("color", "red");
    } else {
      $(textAreaParents).css("color", "#535149");
    }
  });
});
