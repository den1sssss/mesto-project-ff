// Функция закрытия модального окна при нажатии Esc
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Функция закрытия модального окна при клике на оверлей
export function setupModal(modalElement) {
  modalElement.addEventListener('mousedown', (evt) => {
    if (evt.target === modalElement || evt.target.classList.contains('popup__close')) {
      closeModal(modalElement);
    }
  });
}

// Функция открытия модального окна
export function openModal(modalElement) {
  modalElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия модального окна
export function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
} 