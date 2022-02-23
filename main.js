// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

//create 'click' event listeners for all hearts

const clickHearts = document.querySelectorAll('.like-glyph')

for (let hearts of clickHearts) {
  hearts.addEventListener('click', handleClick);
};

//create handleClick function to determine what happens when the user clicks a heart

function handleClick(event) {
  mimicServerCall()
  .then(() => successHeart(event))
  .catch(resp => failHeart(resp));
}

//create successHeart function to determine what happens whent the server returns a success

function successHeart(event){
  let heartEmoji = event.target
  if (heartEmoji.innerText === EMPTY_HEART) {
    heartEmoji.innerText = FULL_HEART
    heartEmoji.classList.add('activated-heart')
  } else if (heartEmoji.innerText === FULL_HEART) {
    heartEmoji.innerText = EMPTY_HEART
    heartEmoji.classList.remove('activated-heart');
  };
};

//create failHeart function to determine what happens when the server returns a failure

function failHeart(resp) {
  errorMessage = document.querySelector('#modal')
  errorMessage.classList.remove('hidden')
  errorMessage.querySelector('h2').innerText = `Error! ${resp}`
  setTimeout(() => errorMessage.classList.add('hidden'), 3000);
};

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
