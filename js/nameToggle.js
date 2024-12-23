export function toggleNameInput() {
    const nameInput = document.getElementById('nameInput');
    const nameToggle = document.getElementById('nameToggle');
    nameInput.disabled = !nameToggle.checked;
    if (!nameToggle.checked) {
        nameInput.value = '';
    }
}