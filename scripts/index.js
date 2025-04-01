const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

function createCard(cardParams, handleDeleteCard) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardTitle.textContent = cardParams.name;
  cardImage.src = cardParams.link;
  cardImage.alt = cardParams.name;

  deleteButton.addEventListener('click', () => handleDeleteCard(cardElement));

  return cardElement;
}

function handleDeleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach((cardData) => {
  const newCard = createCard(cardData, handleDeleteCard);
  placesList.append(newCard);
});