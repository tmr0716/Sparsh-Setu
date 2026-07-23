/**
 * Sparsh Setu - Chatbot Client-Side Engine
 * Controls AJAX communication with Flask backend, typing animation,
 * suggested quick responses, and smooth auto-scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
    initChatbot();
});

function initChatbot() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const suggestedBtns = document.querySelectorAll('.suggested-chip');

    if (!chatForm || !chatInput || !chatMessages) return;

    // Handle form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;

        appendUserMessage(userMsg);
        chatInput.value = '';
        chatInput.focus();

        sendChatbotQuery(userMsg);
    });

    // Handle click on suggested chips
    suggestedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prompt = btn.getAttribute('data-prompt') || btn.innerText;
            chatInput.value = prompt;
            chatForm.dispatchEvent(new Event('submit'));
        });
    });

    /**
     * Appends a user message bubble to the chat container.
     */
    function appendUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-bubble user-bubble animate-fade-up';
        msgDiv.innerHTML = `
            <div class="bubble-content">
                <p>${escapeHtml(text)}</p>
            </div>
            <div class="bubble-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    /**
     * Appends a bot response bubble to the chat container.
     */
    function appendBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-bubble bot-bubble animate-fade-up';
        msgDiv.innerHTML = `
            <div class="bubble-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="bubble-content">
                <p>${escapeHtml(text)}</p>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    /**
     * Renders a temporary typing indicator.
     */
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.className = 'chat-bubble bot-bubble animate-fade-in';
        indicator.innerHTML = `
            <div class="bubble-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="bubble-content typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        chatMessages.appendChild(indicator);
        scrollToBottom();
        return indicator;
    }

    /**
     * Sends message to backend /api/chat route via Fetch API.
     */
    function sendChatbotQuery(messageText) {
        const typingEl = showTypingIndicator();

        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: messageText })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            typingEl.remove();
            if (data.status === 'success') {
                appendBotMessage(data.response);
            } else {
                appendBotMessage("I encountered a problem processing your request. Please try again!");
            }
        })
        .catch(error => {
            console.error('Chat error:', error);
            typingEl.remove();
            appendBotMessage("I'm having trouble connecting right now. Please check your network or try again in a moment.");
        });
    }

    /**
     * Helper to auto-scroll chat window to bottom.
     */
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /**
     * Sanitize text to prevent HTML injection.
     */
    function escapeHtml(unsafe) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }
}
