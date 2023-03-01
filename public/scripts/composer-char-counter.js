$(document).ready(function() {
  console.log("Page is Ready!");

  //Event listener && logic for tweet character counter
  $("textarea").on("input", function(event) {
    const count = $(this).val().length;

    const reverseCount = 140 - count;

    //finding the counter withing the DOM
    const textAreaParents = $(this).parents();
    const directParent = textAreaParents[0];
    const parentChildren = directParent.children;
    const btnAndCounterDiv = parentChildren[2];
    const btnAndCounterDivChildren = btnAndCounterDiv.children;
    let counterChild = btnAndCounterDivChildren[1]

    //reversing the count
    $(counterChild).val(reverseCount);

    //logic for colour if positive or negative number
    if ($(counterChild).val() < 0) {
      $(counterChild).css("color", "red")
    } else {
      $(counterChild).css("color", "#535149")
    }
})
});