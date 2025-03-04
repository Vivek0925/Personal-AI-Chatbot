// let i = 0;
// let text = 'Welcome to personal AI!';
// let speed = 80;
// function textAnimate() {
//   if (i < text.length) {
//     document.getElementById('typing-text').innerHTML += text.charAt(i);
//     i++;
//     setTimeout(textAnimate, speed);
//   }
// }

const typingText = document.getElementById('typing-text');
const text = typingText.getAttribute('data-text');
let index = 0;

function typeLetter() {
  if (index < text.length) {
    typingText.innerHTML = text.substring(0, index + 1);
    index++;
    setTimeout(() => requestAnimationFrame(typeLetter), 80);
  }
}

typingText.innerHTML = '';
requestAnimationFrame(typeLetter);
