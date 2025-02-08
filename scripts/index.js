import { initialCards } from './cards.js';
import { createCard } from './card.js';
import { openModal, closeModal, setupModal } from './modal.js';

const placesList = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

function handleDeleteCard(cardElement) {
    cardElement.remove();
}

function handleLikeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

function handleImageClick(cardData) {
    imagePopupPicture.src = cardData.link;
    imagePopupPicture.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openModal(imagePopup);
}

const modals = document.querySelectorAll('.popup');
modals.forEach(setupModal);

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, {
        handleDeleteCard,
        handleLikeCard,
        handleImageClick
    });
    placesList.append(cardElement);
});