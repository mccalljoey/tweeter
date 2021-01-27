$(document).ready(function() {
  $('textarea').on('input', function (event) {
    let l = $(this).val().length;
    // I have to refer to it. Is this jquery? why wont this work?
    let $counter= $(this).parent('form').find('.counter')
    updateCountdown($counter, l)
  })
});
// I have to move forward I'll come back tot his. The mentor didnt help at all.
// a lot of help the mentor was. i didnt have it on the index document. easy fix. 
function updateCountdown($counter, l) {
  let charsLeft = 140 - l;
  $counter.text(charsLeft);
  $counter.css('color', 'purple');
  if (charsLeft < 0) {
    $counter.css('color', 'red')
  }
};