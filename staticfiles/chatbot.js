document.addEventListener('DOMContentLoaded', function() {
    const chatbotBtn = document.getElementById('chatbot-btn');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('close-btn');
    const sendBtn = document.getElementById('send-btn');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');

    const faqs = {
        "hours": "We are open from 9am to 9pm every day.",
        "location": "Our main office is located at 123 Main St, Springfield.",
        "contact": "You can reach us at (123) 456-7890 or email support@localbiz.com",
        "services": "We offer a variety of services including business listing, advertising, and customer support."
        // Add more FAQ pairs as needed
    };

    // Open chatbot window when button is clicked
    chatbotBtn.addEventListener('click', function() {
        chatbotWindow.style.display = 'flex';
    });

    // Close chatbot window when close button is clicked
    closeBtn.addEventListener('click', function() {
        chatbotWindow.style.display = 'none';
    });

    // Handle sending messages
    sendBtn.addEventListener('click', function() {
        const userMessage = chatbotInput.value.trim();

        if (userMessage) {
            addMessageToChatbot('You', userMessage);
            chatbotInput.value = '';

            setTimeout(function() {
                const botResponse = getBotResponse(userMessage);
                addMessageToChatbot('Bot', botResponse);
            }, 1000);
        }
    });

    // Enter key also sends the message
    chatbotInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendBtn.click();
        }
    });

    function getBotResponse(message) {
        const lowerCaseMsg = message.toLowerCase();

        const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"];
        for (const greet of greetings) {
            if (lowerCaseMsg.includes(greet)) {
                return "Hello! How can I assist you today?";
            }
        }

        for (const key in faqs) {
            if (lowerCaseMsg.includes(key)) {
                return faqs[key];
            }
        }

        return "Sorry, I didn't understand that. Please ask something else or type 'help'.";
    }

    function addMessageToChatbot(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender === 'You' ? 'user-message' : 'bot-message');

        const senderElement = document.createElement('strong');
        senderElement.textContent = sender + ': ';
        messageElement.appendChild(senderElement);

        const messageTextElement = document.createElement('span');
        messageTextElement.textContent = message;
        messageElement.appendChild(messageTextElement);

        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});
