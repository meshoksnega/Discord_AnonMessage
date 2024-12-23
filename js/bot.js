const WEBHOOK_URL = 'https://discord.com/api/webhooks/1320798009906303037/BwZjkuXYLLPU-XLxhR9SdoIBZwxoiN3KCe1REegUh6VIweXnB9p743wHlR47phBAfM1G';

function toggleNameInput() {
    const nameInput = document.getElementById('nameInput');
    const nameToggle = document.getElementById('nameToggle');
    nameInput.disabled = !nameToggle.checked;
    if (!nameToggle.checked) {
        nameInput.value = '';
    }
}

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const nameInput = document.getElementById('nameInput');
    const nameToggle = document.getElementById('nameToggle');
    const statusDiv = document.getElementById('status');
    const message = messageInput.value.trim();

    if (!message) {
        showStatus('Please enter a message', 'error');
        return;
    }

    const senderName = nameToggle.checked ? nameInput.value.trim() : 'Аноним';
    
    const embed = {
        title: '📨 New message!',
        description: message,
        color: 0x5865f2,
        timestamp: new Date().toISOString(),
        footer: {
            text: `Sended: ${senderName}`
        }
    };

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: [embed]
            })
        });

        if (response.ok) {
            showStatus('Message sent successfully!', 'success');
            messageInput.value = '';
            if (nameToggle.checked && !nameInput.value.trim()) {
                showStatus('Имя не указано, сообщение отправлено анонимно', 'success');
            }
        } else {
            const data = await response.json();
            showStatus('Sending error: ' + (data.message || 'Неизвестная ошибка'), 'error');
        }
    } catch (error) {
        showStatus('Sending error: ' + error.message, 'error');
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
