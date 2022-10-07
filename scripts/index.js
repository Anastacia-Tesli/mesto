import { Card, defaultCards, initialCards } from "./Card.js";
import { FormValidator, configObject, forms, formsValidated } from "./FormValidator.js";

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
export function openPopup(element) { 
    element.classList.add('popup_opened');
    element.addEventListener('click', closePopupByClick);
    document.addEventListener('keydown', closePopupOnEsc);
};
function closePopup(element) { 
    element.classList.remove('popup_opened');
    element.removeEventListener('click', closePopupByClick);
    document.removeEventListener('keydown', closePopupOnEsc);
    if (element.querySelector('.popup__form')) {
        const formNotValidated = new FormValidator(configObject, element.querySelector('.popup__form'));
        formNotValidated.disableValidation();
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
    const card = new Card(cardData, '#template');
    document.querySelector('.places').prepend(card.generateCard());
    closePopup(popupAdd);
    formElementAdd.reset();
};
// Слушатели
popupEditOpenButton.addEventListener('click', function () {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});
popupAddOpenButton.addEventListener('click', function () {
    openPopup(popupAdd);
});
formElementEdit.addEventListener('submit', submitFormEdit);
formElementAdd.addEventListener('submit', submitFormAdd);
