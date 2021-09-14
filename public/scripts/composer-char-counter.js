$(document).ready(function() {

  $('#text-box').on('input', function(event) {
    // stores form input
    let $formInput = $(this);

    // targets closest element to the form
    let $forms = $formInput.closest('form');

    // targets the counter
    let $textCount = $forms.find('#counter');

    // targets the capture length of tweet box
    let textLength = $formInput.val().length;

    // character counter
    let charLeft = 140 - textLength;

    // capturing the value of text count
    $textCount.html(charLeft);

    if (charLeft < 0) {
      $textCount.css('color', '#BC2100');
    } else {
      $textCount.css('color', '#45A29E');
    }

  });
});

