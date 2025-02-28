document.querySelector('.login').addEventListener('click', (event) => {
  event.preventDefault(); 
  window.location.href = 'http://localhost:3000/auth/google';
});
