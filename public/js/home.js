document.addEventListener("DOMContentLoaded", () => {
  // Typing animation for welcome message
  function initTypeAnimation() {
    const typingText = document.getElementById("typing-text");
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

  initTypeAnimation();

  // Function to show messages
  function showMessage(content, sender) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.innerHTML = `<p>${content}</p>`;
    const chatBox = document.querySelector("#chat-box");
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Function to handle chat message
  async function handleChatMessage(userInput) {
    const textInput = document.querySelector(".search input[type='text']");
    const sendbtn = document.querySelector(".send");
    const chatBox = document.querySelector("#chat-box");

    showMessage(userInput, "user");
    textInput.value = "";

    const botTyping = document.createElement("div");
    botTyping.classList.add("message", "bot", "typing");
    botTyping.innerHTML = "<p>Typing...</p>";
    chatBox.appendChild(botTyping);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      chatBox.removeChild(botTyping);
      showMessage(data.replay || "No response from bot", "bot");
    } catch (error) {
      console.error("Chat Error:", error);
      chatBox.removeChild(botTyping);
      showMessage("Let me first build the backend bro!🚀", "bot");
    } finally {
      sendbtn.disabled = false;
    }
  }

  // Event listeners
  document.querySelector(".logout").addEventListener("click", () => {
    window.location.href = "/logout";
  });
});
