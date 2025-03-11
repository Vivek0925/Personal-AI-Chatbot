document.addEventListener("DOMContentLoaded", () => {
  // Handle typing animation for welcome message
  const typingText = document.getElementById("typing-text");

  function initTypeAnimation() {
    const text = typingText.getAttribute("data-text");
    typingText.textContent = ""; // Clear the element
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

  // Start the typing animation when page loads
  initTypeAnimation();

  // Chat functionality
  const chatBox = document.querySelector("#chat-box");
  const form = document.querySelector(".search");
  const textInput = document.querySelector(".search input[type='text']");
  const sendbtn = document.querySelector(".send");

  function showMessage(content, sender) {
    let message = document.createElement("div");
    message.classList.add("message", sender);
    message.innerHTML = `<p>${content}</p>`;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userInput = textInput.value.trim();

    if (!userInput) {
      alert("Please enter a message.");
      return;
    }

    sendbtn.disabled = true;
    showMessage(userInput, "user");
    textInput.value = "";

    // For bot typing animation
    const botTyping = document.createElement("div");
    botTyping.classList.add("message", "bot", "typing");
    botTyping.innerHTML = "<p>Typing...</p>";
    chatBox.appendChild(botTyping);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      let response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      let data = await response.json();
      // Remove typing indicator
      chatBox.removeChild(botTyping);
      showMessage(data.replay || "No response from bot", "bot");
    } catch (error) {
      console.error("Chat Error:", error);
      // Remove typing indicator
      chatBox.removeChild(botTyping);
      showMessage("Let me first build the backend bro!🚀", "bot");
    } finally {
      sendbtn.disabled = false;
    }
  });

  // Logout functionality
   const signOutBtn = document.querySelector(".sign-out");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", function() {
      window.location.href = "/logout";
    });
  }
});

 // ---------------------
  // event listener for user profile
  const profileIcon = document.getElementById("profile-icon");
  const settingsMenu = document.getElementById("settings-menu");

  if (profileIcon && settingsMenu) {
    profileIcon.addEventListener("click", function (event) {
      event.stopPropagation();
      settingsMenu.style.display =
        settingsMenu.style.display === "block" ? "none" : "block";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
      if (!profileIcon.contains(event.target) && !settingsMenu.contains(event.target)) {
        settingsMenu.style.display = "none";
      }
    });
  }
  // ---------------------



