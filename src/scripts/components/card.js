// Функция создания карточки
export function createCard(cardData, { handleDeleteCard, handleLikeCard, handleImageClick }) {
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
  deleteButton.addEventListener('click', () => handleDeleteCard(cardElement));
  likeButton.addEventListener('click', () => handleLikeCard(likeButton));
  cardImage.addEventListener('click', () => handleImageClick(cardData));
  
  return cardElement;
} 