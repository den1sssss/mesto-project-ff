export function deleteCard(cardElement) {
  cardElement.remove();
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция создания карточки
export function createCard(cardData, { deleteCard, toggleLike, handleImageClick }) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  // Заполняем данными карточку
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  
  // Добавляем обработчики событий
  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  likeButton.addEventListener('click', () => toggleLike(likeButton));
  cardImage.addEventListener('click', () => handleImageClick(cardData));
  
  return cardElement;
}