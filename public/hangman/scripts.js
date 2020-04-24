// ... crickets...
const letterGuess = document.querySelector('guess');
letterGuess.addEventListener("keydown", function () {
  fetch(`/hangman/guess/`)

})

fetch(`/hangman/words`)
  .then(res => res.json())
  .then(data => console.log(data));

