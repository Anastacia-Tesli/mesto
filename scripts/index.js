import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";
import { FormValidator  } from "./FormValidator.js";

// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddOpenButton = document.querySelector('.profile__add-button');

// Формы и инпуты
const formElementEdit = document.querySelector('.popup__form_type_edit');
const nameInput = formElementEdit.querySelector('#name-input');
const jobInput = formElementEdit.querySelector('#job-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const formElementAdd = document.querySelector('.popup__form_type_add');
const placeInput = formElementAdd.querySelector('#place-input');
const linkInput = formElementAdd.querySelector('#link-input');
const places = document.querySelector('.places');

// Рендеринг карточек 
const defaultCards = initialCards.forEach((element) => {
    const card = new Card(element, '#template', handleOpenPopup);
    const cardElement = card.generateCard();
    document.querySelector('.places').prepend(cardElement);
});
  
// Валидация
const configObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
const formEditValidated = new FormValidator(configObject, formElementEdit);
const formAddValidated = new FormValidator(configObject, formElementAdd);
formEditValidated.enableValidation();
formAddValidated.enableValidation();

// Открытие и закрытие попапов
function closePopupByClick(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closePopup(evt.currentTarget);
    }
}
function closePopupOnEsc(evt) {  
    if (evt.key == "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}
function openPopup(element) { 
    element.classList.add('popup_opened');
    element.addEventListener('click', closePopupByClick);
    document.addEventListener('keydown', closePopupOnEsc);
};
function handleOpenPopup(name, link) {
    const popupShow = document.querySelector('.popup_type_show');
    const popupShowImage = popupShow.querySelector('.popup__image');
    popupShowImage.src = link;
    popupShowImage.setAttribute('alt', `Фотография: ${name}`);
    popupShow.querySelector('.popup__description').textContent = name;
    openPopup(popupShow);
}
function closePopup(element) { 
    element.classList.remove('popup_opened');
    element.removeEventListener('click', closePopupByClick);
    document.removeEventListener('keydown', closePopupOnEsc);
    if (element.querySelector('.popup__form')) {
        formEditValidated.disableValidation();
        formAddValidated.disableValidation();
    }
};

// Сабмит на формах
function submitFormEdit () {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
};
function submitFormAdd () {
    const cardData = {
        name: placeInput.value,
        link: linkInput.value
    };
    const card = new Card(cardData, '#template', handleOpenPopup);
    places.prepend(card.generateCard());
    closePopup(popupAdd);
    formElementAdd.reset();
};

// Слушатели
popupEditOpenButton.addEventListener('click', () => {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});
popupAddOpenButton.addEventListener('click', () => {
    openPopup(popupAdd);
});
formElementEdit.addEventListener('submit', submitFormEdit);
formElementAdd.addEventListener('submit', submitFormAdd);
