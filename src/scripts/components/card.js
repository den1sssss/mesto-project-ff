import { addLike, removeLike, deleteCard as removeCardFromServer } from './api.js';

export function deleteCard(cardElement, cardId) {
  return removeCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    });
}

export function toggleLike(likeButton, cardId, likeCountElement, isLiked) {
  const likeAction = isLiked ? removeLike : addLike;
  
  return likeAction(cardId)
    .then((data) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCountElement.textContent = data.likes.length;
      return !isLiked;
    });
}

// Функция создания карточки
export function createCard(cardData, { handleDeleteCard, handleLikeClick, handleImageClick, userId }) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  // Создаем элемент для отображения количества лайков
  const likeCountElement = document.createElement('span');
  likeCountElement.classList.add('card__like-count');
  likeCountElement.textContent = cardData.likes.length;
  likeButton.after(likeCountElement);
  
  // Заполняем данными карточку
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  
  // Проверяем, является ли текущий пользователь владельцем карточки
  const isOwner = cardData.owner._id === userId;
  if (!isOwner) {
    deleteButton.remove();
  }
  
  // Проверяем, поставил ли текущий пользователь лайк этой карточке
  const isLiked = cardData.likes.some(user => user._id === userId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  
  // Добавляем обработчики событий
  if (isOwner) {
    deleteButton.addEventListener('click', () => handleDeleteCard(cardElement, cardData._id));
  }
  
  likeButton.addEventListener('click', () => {
    handleLikeClick(likeButton, cardData._id, likeCountElement, isLiked)
      .then(newIsLiked => {
        // Обновляем состояние лайка
        cardData.isLiked = newIsLiked;
      })
      .catch(err => console.error('Ошибка при обработке лайка:', err));
  });
  
  cardImage.addEventListener('click', () => handleImageClick(cardData));
  
  return cardElement;
}