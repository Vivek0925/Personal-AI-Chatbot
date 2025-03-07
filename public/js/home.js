document.addEventListener("DOMContentLoaded", () => {
  const typingText = document.getElementById("typing-text");
  const sendbtn = document.querySelector(".send");
  const chatBox = document.querySelector("#chat-box");
  const fileInput = document.getElementById("file-input");
  const form = document.querySelector(".search");
  const textInput = document.querySelector(".search input[type='text']");

  // Initialize typing animation for welcome message
  function initTypeAnimation() {
    const text = typingText.getAttribute("data-text");
    typingText.textContent = ""; // Clear the element
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50); // Adjust speed as needed
      }
    }

    typeWriter();
  }

  // Start the typing animation when page loads
  initTypeAnimation();

  function showMessage(content, sender) {
    let message = document.createElement("div");
    message.classList.add("message", sender);
    message.innerHTML = `<p>${content}</p>`;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    const userInput = textInput.value.trim();

    if (!file && !userInput) {
      alert("Please enter a message or select a file.");
      return;
    }

    sendbtn.disabled = true;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      textInput.value = "Uploading...";

      try {
        const response = await fetch("/process-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload failed!");

        const data = await response.json();
        textInput.value = "File uploaded!";
        setTimeout(() => {
          textInput.value = "";
          fileInput.value = "";
        }, 3000);
      } catch (error) {
        console.error("Upload Error:", error);
        textInput.value = "Upload failed. Try again.";
      } finally {
        sendbtn.disabled = false;
      }
      return;
    }

    if (userInput) {
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
        showMessage("Let me first the backend bro!🚀", "bot");
      } finally {
        sendbtn.disabled = false;
      }
    }
  });
});
