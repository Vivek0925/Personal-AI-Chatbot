const loginLink = document.getElementById('loginLink');
const signupLink = document.getElementById('signupLink');
const imageContainer = document.getElementById('imageContainer');
const googleButton = document.getElementById('google');

if (loginLink) {
  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    imageContainer.classList.add('slide-out-left');
    setTimeout(() => {
      window.location.href = loginLink.href;
    }, 500);
  });
}

if (signupLink) {
  signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    imageContainer.classList.add('slide-out-right');
    setTimeout(() => {
      window.location.href = signupLink.href;
    }, 500);
  });
}

if (googleButton) {
  googleButton.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/auth/google';
  });
}
