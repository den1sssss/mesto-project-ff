import '../pages/index.css'; 
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, toggleLike } from './components/card.js';
import { openModal, closeModal, setupModal } from './components/modal.js';
import { enableValidation, clearValidation } from './validation.js';
import * as api from './components/api.js';
import avatar from '../images/avatar.jpg';

// DOM-элементы
const cardTemplate = document.querySelector('#card-template');
const cardsContainer = document.querySelector('.places__list');
const profileImage = document.querySelector('.profile__image');

// Модальные окна
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const avatarModal = document.querySelector('.popup_type_avatar');

// Кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Элементы форм
const editProfileForm = editProfileModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');
const avatarForm = avatarModal.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');
const avatarInput = avatarForm.querySelector('.popup__input_type_url');

// Элементы профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Элементы модального окна изображения
const modalImage = imageModal.querySelector('.popup__image');
const modalCaption = imageModal.querySelector('.popup__caption');

// Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// ID текущего пользователя
let userId;

function handleImageClick(cardData) {
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalCaption.textContent = cardData.name;
  openModal(imageModal);
}

// Функция обработки удаления карточки
function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardElement, cardId)
    .catch(err => {
      console.error('Ошибка при удалении карточки:', err);
    });
}

// Функция обработки лайка
function handleLikeClick(likeButton, cardId, likeCountElement, isLiked) {
  return toggleLike(likeButton, cardId, likeCountElement, isLiked)
    .catch(err => {
      console.error('Ошибка при обновлении лайка:', err);
      return isLiked; // Возвращаем исходное значение в случае ошибки
    });
}

// Обработчики открытия модальных окон
function handleEditProfileClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
}

function handleAddCardClick() {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(addCardModal);
}

// Обработчики отправки форм
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'Сохранение...';
  
  api.updateUserInfo(nameInput.value, jobInput.value)
    .then(userData => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch(err => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'Сохранение...';
  
  api.addCard(cardNameInput.value, cardLinkInput.value)
    .then(cardData => {
      const newCard = createCard(cardData, {
        handleDeleteCard,
        handleLikeClick,
        handleImageClick,
        userId
      });
      
      cardsContainer.prepend(newCard);
      addCardForm.reset();
      closeModal(addCardModal);
    })
    .catch(err => {
      console.error('Ошибка при добавлении карточки:', err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

// Обработчик клика по аватару для его редактирования
function setupAvatarEdit() {
  profileImage.addEventListener('click', () => {
    avatarForm.reset();
    clearValidation(avatarForm, validationConfig);
    openModal(avatarModal);
  });
}

// Обработчик отправки формы обновления аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'Сохранение...';
  
  api.updateAvatar(avatarInput.value)
    .then(userData => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarModal);
    })
    .catch(err => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

// Навешиваем обработчики событий
editProfileButton.addEventListener('click', handleEditProfileClick);
addCardButton.addEventListener('click', handleAddCardClick);
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
addCardForm.addEventListener('submit', handleAddCardSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);
setupAvatarEdit();

// Настраиваем закрытие модальных окон
const modals = document.querySelectorAll('.popup');
modals.forEach(setupModal);

// Инициализация валидации
enableValidation(validationConfig);

// Загружаем данные пользователя и карточки с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // Сохраняем ID пользователя
    userId = userData._id;
    
    // Отображаем информацию о пользователе
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    
    // Загружаем карточки
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, {
        handleDeleteCard,
        handleLikeClick,
        handleImageClick,
        userId
      });
      cardsContainer.append(cardElement);
    });
  })
  .catch(err => {
    console.error('Ошибка при загрузке данных:', err);
  });