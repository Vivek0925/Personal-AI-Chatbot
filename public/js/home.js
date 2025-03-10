document.addEventListener("DOMContentLoaded", () => {
  // typing animation
  const typingText = document.getElementById("typing-text");
  function initTypeAnimation() {
    const text = typingText.getAttribute("data-text");
    typingText.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    typeWriter();
  }
  initTypeAnimation(); //typing animation at reload

  // Logout functionality
  const logoutBtn = document.querySelector(".logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "/logout";
    });
  }

  //Fileupload logic
  
});
