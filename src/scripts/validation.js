// Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Показать ошибку
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
}

// Скрыть ошибку
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
}

// Проверить валидность
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    const errorMessage = inputElement.dataset.errorMessage || inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Переключить состояние кнопки
function toggleButtonState(inputList, buttonElement, config) {
  const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);
  buttonElement.disabled = hasInvalidInput;
  buttonElement.classList.toggle(config.inactiveButtonClass, hasInvalidInput);
}

// Установить слушатели
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// Включить валидацию
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, config);
  });
}

// Очистить валидацию
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config);
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}