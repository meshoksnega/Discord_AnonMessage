const BOT_TOKEN = '7079905543:AAHOPZTxR8TARuzPJro7g7vktnZ8BzdOpI4';
const CHAT_ID = '@Meshok_Snega';

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const statusDiv = document.getElementById('status');
    const message = messageInput.value.trim();

    if (!message) {
        showStatus('Please enter a message', 'error');
        return;
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        const data = await response.json();

        if (data.ok) {
            showStatus('Message sent successfully!', 'success');
            messageInput.value = '';
        } else {
            showStatus('Failed to send message: ' + data.description, 'error');
        }
    } catch (error) {
        showStatus('Error sending message: ' + error.message, 'error');
    }
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = 'status ' + type;
    
    setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'status';
    }, 3000);
}