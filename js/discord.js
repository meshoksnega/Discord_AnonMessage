import { showStatus } from './utils.js';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1320798009906303037/BwZjkuXYLLPU-XLxhR9SdoIBZwxoiN3KCe1REegUh6VIweXnB9p743wHlR47phBAfM1G';

export async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const nameInput = document.getElementById('nameInput');
    const nameToggle = document.getElementById('nameToggle');
    const message = messageInput.value.trim();

    if (!message) {
        showStatus('Пожалуйста, введите сообщение', 'error');
        return;
    }

    const senderName = nameToggle.checked ? nameInput.value.trim() : 'Аноним';
    
    const embed = {
        title: '📨 Новое сообщение',
        description: message,
        color: 0x5865f2,
        timestamp: new Date().toISOString(),
        footer: {
            text: `Отправлено: ${senderName}`
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
            showStatus('Сообщение успешно отправлено!', 'success');
            messageInput.value = '';
            if (nameToggle.checked && !nameInput.value.trim()) {
                showStatus('Имя не указано, сообщение отправлено анонимно', 'success');
            }
        } else {
            const data = await response.json();
            showStatus('Ошибка отправки: ' + (data.message || 'Неизвестная ошибка'), 'error');
        }
    } catch (error) {
        showStatus('Ошибка отправки: ' + error.message, 'error');
    }
}