import '../pages/index.css'; 
import { initialCards } from './components/cards.js';
import { createCard } from './components/card.js';
import { openModal, closeModal, setupModal } from './components/modal.js';
import avatar from '../images/avatar.jpg';
// DOM-элементы
const cardTemplate = document.querySelector('#card-template');
const cardsContainer = document.querySelector('.places__list');

document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// Модальные окна
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

// Кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Элементы форм
const editProfileForm = editProfileModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

// Элементы профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Элементы модального окна изображения
const modalImage = imageModal.querySelector('.popup__image');
const modalCaption = imageModal.querySelector('.popup__caption');

// Функции обработчики для карточек
function handleDeleteCard(cardElement) {
  cardElement.remove();
}

function handleLikeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

function handleImageClick(cardData) {
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalCaption.textContent = cardData.name;
  openModal(imageModal);
}

// Обработчики открытия модальных окон
function handleEditProfileClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfileModal);
}

function handleAddCardClick() {
  addCardForm.reset();
  openModal(addCardModal);
}

// Обработчики отправки форм
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  
  const newCard = createCard(cardData, {
    handleDeleteCard,
    handleLikeCard,
    handleImageClick
  });
  
  cardsContainer.prepend(newCard);
  closeModal(addCardModal);
  addCardForm.reset();
}

// Навешиваем обработчики событий
editProfileButton.addEventListener('click', handleEditProfileClick);
addCardButton.addEventListener('click', handleAddCardClick);
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
addCardForm.addEventListener('submit', handleAddCardSubmit);

// Настраиваем закрытие модальных окон
const modals = document.querySelectorAll('.popup');
modals.forEach(setupModal);

// Загружаем начальные карточки
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, {
    handleDeleteCard,
    handleLikeCard, 
    handleImageClick
  });
  cardsContainer.append(cardElement);
});