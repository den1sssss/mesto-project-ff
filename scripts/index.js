const cardTemplateElement = document.querySelector('#card-template')
const cardsContainer = document.querySelector('.places__list')

function createCard(cardData, handleDelete) {
    const cardElement = cardTemplateElement.content.querySelector('.card').cloneNode(true)
    const deleteButton = cardElement.querySelector('.card__delete-button')
    const cardImageElement = cardElement.querySelector('.card__image')
    const cardTitleElement = cardElement.querySelector('.card__title')

    deleteButton.addEventListener('click', handleDelete)
    deleteButton.targetElement = cardElement
    
    cardTitleElement.textContent = cardData.name
    cardImageElement.src = cardData.link
    cardImageElement.alt = cardData.name

    return cardElement
}

function handleCardDelete(evt) {
    evt.currentTarget.targetElement.remove()
}

initialCards.forEach((cardData) => {
    cardsContainer.append(createCard(cardData, handleCardDelete))
})
