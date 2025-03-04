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
