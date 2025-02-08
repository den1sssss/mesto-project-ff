export function openModal(modalElement) {
    modalElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose);
}

export function closeModal(modalElement) {
    modalElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.popup_opened');
        if (openedModal) {
            closeModal(openedModal);
        }
    }
}

export function setupModal(modalElement) {
    modalElement.addEventListener('mousedown', (evt) => {
        if (evt.target === modalElement || evt.target.classList.contains('popup__close')) {
            closeModal(modalElement);
        }
    });
} 