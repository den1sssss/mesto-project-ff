export function createCard(cardData, { handleDeleteCard, handleLikeCard, handleImageClick }) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    
    deleteButton.addEventListener('click', () => handleDeleteCard(cardElement));
    likeButton.addEventListener('click', () => handleLikeCard(likeButton));
    cardImage.addEventListener('click', () => handleImageClick(cardData));
    
    return cardElement;
} 