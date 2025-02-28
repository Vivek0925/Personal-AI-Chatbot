document.querySelector('.Gbtn').addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'http://localhost:3000/auth/google';
});

// Fronted part----------------------------------------------
const container = document.querySelector('.container');
const LoginLink = document.querySelector('.SingInLink');
const RegisterLink = document.querySelector('.SingUpLink');
RegisterLink.addEventListener('click', function () {
  container.classList.add('active');
});
LoginLink.addEventListener('click', function () {
  container.classList.remove('active');
});

document
  .getElementById('togglePassword')
  .addEventListener('click', function () {
    let passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      this.classList.replace('ri-eye-off-fill', 'ri-eye-fill');
    } else {
      passwordField.type = 'password';
      this.classList.replace('ri-eye-fill', 'ri-eye-off-fill');
    }
  });

var t1 = gsap.timeline();

gsap.from('.stars', {
  y: -100,
  opacity: 0,
  delay: 0.4,
  duration: 1,
});

t1.from('.container', {
  y: 150,
  opacity: 0,
  delay: 0.4,
  duration: 1.6,
  stagger: 1,
});

t1.from('.logo-container', {
  y: -80,
  opacity: 0,
  duration: 1,
  stagger: 1,
});
