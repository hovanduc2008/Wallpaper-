const API_URL = "https://script.google.com/macros/s/AKfycbzKdYzjvGJGPVZ5FIaNQca-AjqHjVveXoahbxcoWzr-KBhCG4-XhVDse7uD6k7e_ptP/exec"; // Thay YOUR_GOOGLE_SCRIPT_URL bằng URL đã deploy

let username = "";

function login() {
    username = document.getElementById("username").value.trim();
    if (username === "") {
        alert("Vui lòng nhập tên!");
        return;
    }
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
    loadMessages();
}

async function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();
    if (message === "") return;

    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ user: username, message }),
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    });

    messageInput.value = "";
    loadMessages();
}

async function loadMessages() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    });

    const messages = await response.json();
    displayMessages(messages);
}

// Cập nhật tin nhắn mỗi 3 giây
setInterval(loadMessages, 3000);
